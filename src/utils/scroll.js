const positionStore = Object.create(null)

export function saveScrollPosition () {
    const key = getStateKey()
    if (key) {
        positionStore[key] = {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    }
}
  
function getScrollPosition () {
    const key = getStateKey()
    if (key) {
        return positionStore[key]
    }
}

function isValidPosition (obj) {
    return isNumber(obj.x) || isNumber(obj.y)
}

function scrollToPosition (position) {
    if (position && isValidPosition(position)) {
      window.scrollTo(position.x, position.y)
    }
}