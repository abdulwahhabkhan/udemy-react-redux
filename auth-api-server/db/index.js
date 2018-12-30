const fs = require('fs')

exports.model = function(name, extensions = {}) {
  const table = new Table(name)

  function Base() {}
  Base.prototype = extensions

  class Model extends Base {
    static async findOne(query) {
      const [id, data] = await table.find(query)
      if (id) {
        return new subclass(data, id)
      }
    }

    constructor(data, id) {
      this._id = id
      this.__data = data
    }

    get(key) {
      return this.__data[key]
    }

    set(key, value) {
      return (this.__data[key] = value)
    }

    del(key) {
      const value = this.__data[key]
      if (value) delete this.__data[key]
      return value
    }

    async save() {
      if (this.beforeSave) await Promise.resolve(this.beforeSave())
      if (!this._id) {
        this._id = await table.insert(this.__data)
      } else {
        await table.update(this._id, this.__data)
      }
    }
  }

  return Model
}

class Table {
  constructor(name) {
    this._path = `${__dirname}/${name}.json`
    if (fs.existsSync(this._path)) {
      this._table = JSON.parse(fs.readFileSync(this._path))
    } else {
      this._table = { nextId: 1, entries: {} }
      fs.writeFileSync(this._path, JSON.stringify(this._table))
    }
  }

  async find(query) {
    const predicate = predicateFromQueryObject(query)
    return Object.entries(this._table.entries).find(predicate) || []
  }

  async get(id) {
    const data = this._table.entries[id]
    if (data) return clone(data)
  }

  async insert(data) {
    const id = this._table.nextId++
    this._table.entries[id] = clone(data)
    await this._write()
    return id
  }

  async update(id, data) {
    if (!this._table.entries[id]) {
      throw new Error(`No entry with id ${id}`)
    }
    this._table.entries[id] = clone(data)
    await this._write()
  }

  async delete(id) {
    const data = this._table.entries[id]
    if (typeof data !== 'undefined') {
      delete this._table.entries[id]
      await this._write()
    } else {
      throw new Error(`No entry with id ${id}`)
    }
  }

  _write() {
    return fs.promises.writeFile(this._path, JSON.stringify(this._table))
  }
}

function clone(data) {
  return JSON.parse(JSON.stringify(data))
}

function predicateFromQueryObject(query) {
  return function([id, data]) {
    for (let [key, value] of Object.entries(query)) {
      if (data[key] !== value) return false
    }
    return true
  }
}

function promiseQueue() {
  let queue = Promise.resolve()
  return function(result) {
    const next = () => result
    return (queue = queue.then(next, next))
  }
}
