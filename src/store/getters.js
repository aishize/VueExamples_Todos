export default {
    itemsLeft: state => {
        let sum = 0
        state.todoList.map(item => item.isDone).forEach(item => {
            if (!item) {
                sum += 1
            }
        })
        return sum
    }
}