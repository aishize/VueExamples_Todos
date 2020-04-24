function checkRepeat (list, newId) {
    return !list.map(item => item.id).includes(newId)
}

export const generateId = todoList => {
    const newId = Math.floor(Math.random() * 1234567) - 9876
    if (checkRepeat(todoList, newId)) {
        return newId
    } else {
        generateId(todoList)
    }
}

export const factory = (fn, component, props) => {
    return fn(component, {
      propsData: {
        ...props
      }
    })
  }