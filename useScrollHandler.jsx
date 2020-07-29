import { useState, useEffect } from "react"

export const useScrollHandler = (props) => {
// setting initial value to true
const [scroll, setScroll] = useState(1)

// running on mount
useEffect(() => {
  const onScroll = () => {
    const scrollCheck = window.scrollY < 10
    if (scrollCheck !== scroll) {
      setScroll(scrollCheck)
    }
  }

// setting the event handler from web API
props.refProp.addEventListener("scroll", onScroll)

// cleaning up from the web API
 return () => {
    props.refProp.removeEventListener("scroll", onScroll)
  }
}, [scroll, setScroll])

return scroll

}