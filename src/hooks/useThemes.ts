import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export function useThemes() {
  const { theme, setTheme } = useTheme()
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    setIsDarkTheme(theme === 'dark')
  }, [theme])

  function changeTheme() {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return { isDarkTheme, theme, changeTheme }
}
