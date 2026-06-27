import { type ChangeEvent,useCallback, useEffect, useMemo } from "react"
import { useNavigation, useSearchParams, useSubmit } from "react-router"
import { useDebouncedCallback } from "use-debounce"

import { ROUTES } from "@/root/routes"

import { useAudioFiltersUI } from "../provider/audio-filter-context"

export const useAudioFilters = () => {
  const { isFiltersOpen, handleCloseFilters, handleOpenFilters } =
    useAudioFiltersUI()

  const [searchParams, setSearchParams] = useSearchParams()

  const submit = useSubmit()

  const navigation = useNavigation()
  const isFiltering =
    (navigation.state === "loading" &&
      navigation.location.search.includes("?")) ||
    navigation.location?.search.includes("&")

  const debouncedSubmit = useDebouncedCallback((form: HTMLFormElement) => {
    const formData = new FormData(form)
    const searchTerm = formData.get("search") as string

    const newParams = new URLSearchParams(searchParams)

    if (!searchTerm) newParams.delete("search")
    else newParams.set("search", searchTerm)

    submit(newParams, { method: "get", replace: true, action: ROUTES.HOME })
  }, 600)

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      debouncedSubmit(event.currentTarget.form!),
    [debouncedSubmit],
  )

  const handleToggleFilter = useCallback(
    (key: string, value: string) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams)
        const currentValues = newParams.getAll(key)

        if (currentValues.includes(value)) {
          const filtered = currentValues.filter((val) => val !== value)
          newParams.delete(key)
          filtered.forEach((val) => newParams.append(key, val))
        } else {
          newParams.append(key, value)
        }

        return newParams
      })
    },
    [setSearchParams],
  )

  const hasFilters = useMemo(
    () => Array.from(searchParams.keys()).length > 0,
    [searchParams],
  )

  useEffect(() => {
    const isMobile = window.innerWidth < 640

    if (isFiltersOpen && isMobile) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isFiltersOpen])

  return {
    searchValue: searchParams.get("search") || "",
    searchParams,
    hasFilters,
    isFiltering,
    isFiltersOpen,
    setSearchParams,
    handleSearch,
    handleToggleFilter,
    handleCloseFilters,
    handleOpenFilters,
  }
}
