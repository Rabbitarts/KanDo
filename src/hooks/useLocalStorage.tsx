import { useEffect, useState } from 'react'

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, SetValue<T>] {
	const readValue = (): T => {
		if (typeof window === 'undefined') {
			return initialValue
		}

		const item = window.localStorage.getItem(key)
		return item ? parseJson<T>(item) : initialValue
	}

	const [storedValue, setStoredValue] = useState<T>(readValue)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(key, JSON.stringify(storedValue))
		}
	}, [key, storedValue])

	return [storedValue, setStoredValue]
}

function parseJson<T>(json: string): T {
	try {
		const parsedValue = JSON.parse(json)
		if (!Array.isArray(parsedValue)) {
			console.error('Error: parsed value is not an array: ', parsedValue)
			return [] as any as T
		}
		return parsedValue as any as T
	} catch (e) {
		console.error('Error parse JSON: ', json)
		return [] as any as T
	}
}
