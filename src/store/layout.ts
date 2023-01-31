

interface StateType {
  tags: Array<string>
}

export const useLayoutStore = defineStore('layout', {
  state: (): StateType => ({
    tags: []
  }),
  actions: {
    addTag(name: string) {
      this.tags.indexOf(name) === -1 &&
        name !== 'Dashboard' &&
        this.tags.push(name)
    },
    removeTag(name: string) {
      this.tags = this.tags.filter(i => i !== name)
    }
  }
})
