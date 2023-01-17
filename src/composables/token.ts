import { RemovableRef } from "@vueuse/core"

export let token: RemovableRef<string | null> = useLocalStorage('token', null)

export function setToken(value: string) {
    token = useLocalStorage('token', value)
}

export function removeToken() {
    token.value = null
}
