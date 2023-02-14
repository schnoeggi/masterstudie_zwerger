export class Swiper {

  constructor(fallbackFunction = () => {}) {
    this.touchstartX = 0
    this.touchendX = 0
    this.fallbackFunction = fallbackFunction
    this.touchstart = e => {
      this.touchstartX = e.changedTouches[0].screenX
    }
    const that = this
    this.touchend = e => {
      this.touchendX = e.changedTouches[0].screenX
      that.checkDirection()
    }

    document.addEventListener('touchstart', this.touchstart)
    document.addEventListener('touchend',this.touchend)
  }

  checkDirection() {
    if (this.touchendX < this.touchstartX) this.fallbackFunction()
    //if (this.touchendX > this.touchstartX) alert('swiped right!')
  }

  close() {
    document.removeEventListener('touchstart', this.touchstart)
    document.removeEventListener('touchend',this.touchend)
  }
}







