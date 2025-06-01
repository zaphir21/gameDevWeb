export class Backgrounds {

  constructor(containerId, interval) {
      this.container = document.getElementById(containerId); 
      this.backgrounds = [
          "url('../assets/background_07.PNG')",
          "url('../assets/background_01.jpg')",
          "url('../assets/background_05.PNG')",
          "url('../assets/background_08.PNG')",
          "url('../assets/background_06.PNG')",
      ];
      this.interval = interval; 
      this.currentIndex = 0; 
    }
    start() {
      
      this.updateBackground();
      setInterval(() => this.updateBackground(), this.interval);
    }
    
    updateBackground() {
      this.container.style.backgroundImage = this.backgrounds[this.currentIndex];
      this.currentIndex++;
      if (this.currentIndex >= this.backgrounds.length) {
        this.currentIndex = 0;
      }
    }
}
