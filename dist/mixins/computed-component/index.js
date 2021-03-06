import dataPath from './data-path';
import dataTracer from './data-tracer';

const getDataOnPath = function (data, path) {
  let ret = data
  path.forEach((s) => {
    if (typeof ret !== 'object' || ret === null) ret = undefined
    else ret = ret[s]
  })
  return ret
}

const setDataOnPath = function (data, path, value) {
  let cur = data
  let index = 0
  while (index < path.length - 1) {
    const s = path[index++]
    if (typeof s === 'number') {
      if (!(cur[s] instanceof Array)) {
        cur[s] = []
      }
    } else if (typeof cur[s] !== 'object' || cur[s] === null) {
      cur[s] = {}
    }
    cur = cur[s]
  }
  cur[path[index]] = value
}

export default Behavior({
  lifetimes: {
    created() {
      this._initComputedWatchInfo()
    }
  },
  definitionFilter(defFields) {
    const computedDef = defFields.computed || {}
    const watchDef = defFields.watch || {}

    const observersItems = []
    if (!defFields.methods) {
      defFields.methods = {}
    }
    if (!defFields.data) {
      defFields.data = {}
    }
    if (defFields.methods._initComputedWatchInfo) {
      throw new Error('Please do not use this behavior more than once in a single component')
    }

    // initialize status, executed on created
    const initFuncs = []
    defFields.methods._initComputedWatchInfo = function () {
      if (this._computedWatchInfo) return
      this._computedWatchInfo = {
        computedRelatedPathValues: {},
        watchCurVal: {},
      }
      initFuncs.forEach((func) => func.call(this))
    }

    // handling computed
    const computedUpdaters = []
    Object.keys(computedDef).forEach((targetField) => {
      const targetPath = dataPath.parseSingleDataPath(targetField)
      const updateMethod = computedDef[targetField]
      // update value and calculate related paths
      const updateValueAndRelatedPaths = function () {
        const oldPathValues = this._computedWatchInfo.computedRelatedPathValues[targetField]
        let needUpdate = false
        for (let i = 0; i < oldPathValues.length; i++) {
          const {path, value: oldVal} = oldPathValues[i]
          const curVal = getDataOnPath(this.data, path)
          if (oldVal !== curVal) {
            needUpdate = true
            break
          }
        }
        if (!needUpdate) return false
        const relatedPathValues = []
        const val = updateMethod(dataTracer.create(this.data, relatedPathValues))
        this.setData({
          [targetField]: val
        })
        this._computedWatchInfo.computedRelatedPathValues[targetField] = relatedPathValues
        return true
      }
      // calculate value on registration
      const relatedPathValuesOnDef = []
      const val = updateMethod(dataTracer.create(defFields.data, relatedPathValuesOnDef))
      setDataOnPath(defFields.data, targetPath, val)
      initFuncs.push(function () {
        const pathValues = relatedPathValuesOnDef.map(({path}) => ({
          path,
          value: getDataOnPath(this.data, path)
        }))
        this._computedWatchInfo.computedRelatedPathValues[targetField] = pathValues
      })
      // calculate value on setData
      computedUpdaters.push(updateValueAndRelatedPaths)
    })
    if (computedUpdaters.length) {
      // add a single observer for all computed fields
      observersItems.push({
        fields: '**',
        observer() {
          if (!this._computedWatchInfo) return
          let changed
          do {
            changed = false
            // eslint-disable-next-line no-loop-func
            computedUpdaters.forEach((func) => {
              if (func.call(this)) changed = true
            })
          } while (changed)
        }
      })
    }

    // handling watch
    Object.keys(watchDef).forEach((watchPath) => {
      const paths = dataPath.parseMultiDataPaths(watchPath)
      // record the original value of watch targets
      initFuncs.push(function () {
        const curVal = paths.map((path) => getDataOnPath(this.data, path))
        this._computedWatchInfo.watchCurVal[watchPath] = curVal
      })
      // add watch observer
      observersItems.push({
        fields: watchPath,
        observer() {
          if (!this._computedWatchInfo) return
          const oldVal = this._computedWatchInfo.watchCurVal[watchPath]
          const curVal = paths.map((path) => getDataOnPath(this.data, path))
          this._computedWatchInfo.watchCurVal[watchPath] = curVal
          let changed = false
          for (let i = 0; i < curVal.length; i++) {
            if (oldVal[i] !== curVal[i]) {
              changed = true
              break
            }
          }
          if (changed) watchDef[watchPath].apply(this, curVal)
        }
      })
    })

    // register to observers
    if (typeof defFields.observers !== 'object') {
      defFields.observers = {}
    }
    if (defFields.observers instanceof Array) {
      defFields.observers.push(...observersItems)
    } else {
      observersItems.forEach((item) => {
        defFields.observers[item.fields] = item.observer
      })
    }
  },
})
