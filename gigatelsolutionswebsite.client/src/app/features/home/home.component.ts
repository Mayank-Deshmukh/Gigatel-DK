import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  isSecondParagraphVisible: boolean = false; // By default, second paragraph is hidden

  toggleParagraph(): void {
    this.isSecondParagraphVisible = !this.isSecondParagraphVisible; // Toggle visibility of second paragraph
  }
  // Typing effect properties
  private cities: string[] = [
    'Delhi',
    'Gurgaon',
    'Noida',
    'Greater Noida',
    'Sikandrabad',
    'Aligarh',
    'Agra',
    'Gwalior'
  ];
  private cityIndex: number = 0;
  private charIndex: number = 0;
  private typingSpeed: number = 100; // Milliseconds per character
  private erasingSpeed: number = 50; // Milliseconds per character
  private delayBetweenCities: number = 1500; // Delay before typing the next city
  public displayedText: string = ''; // Text displayed in the UI

  // Incrementing numbers properties
  public Yearsofoperations: number = 0;
  public Professionals: number = 0;
  public Customers: number = 0;
  public Projectsundertaken: number = 0;
  public Locations: number = 0;
  public Trainedmanpower: number = 0;

  // Final values
  private YearsofoperationsTarget: number = 8;
  private ProfessionalsTarget: number = 200;
  private CustomersTarget: number = 100;
  private ProjectsundertakenTarget: number = 1000;
  private LocationsTarget: number = 100;
  private TrainedmanpowerTarget: number = 200;

  private hasAnimated: boolean = false; // Flag to prevent re-triggering animation

  ngOnInit(): void {
    // Start the typing effect
    this.typeCity();
  }

  ngAfterViewInit(): void {
    const section = document.getElementById('animated-numbers');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true; // Ensure animation runs only once
            this.animateNumbers('Yearsofoperations', this.YearsofoperationsTarget, 3000);
            this.animateNumbers('Professionals', this.ProfessionalsTarget, 3000);
            this.animateNumbers('Customers', this.CustomersTarget, 3000);
            this.animateNumbers('Projectsundertaken', this.ProjectsundertakenTarget, 3000);
            this.animateNumbers('Locations', this.LocationsTarget, 3000);
            this.animateNumbers('Trainedmanpower', this.TrainedmanpowerTarget, 3000);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (section) {
      observer.observe(section);
    }
  }

  // Typing effect logic
  private typeCity(): void {
    if (this.charIndex < this.cities[this.cityIndex].length) {
      this.displayedText += this.cities[this.cityIndex].charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.typeCity(), this.typingSpeed);
    } else {
      setTimeout(() => this.eraseCity(), this.delayBetweenCities);
    }
  }

  private eraseCity(): void {
    if (this.charIndex > 0) {
      this.displayedText = this.cities[this.cityIndex].substring(0, this.charIndex - 1);
      this.charIndex--;
      setTimeout(() => this.eraseCity(), this.erasingSpeed);
    } else {
      this.cityIndex = (this.cityIndex + 1) % this.cities.length; // Move to the next city
      setTimeout(() => this.typeCity(), this.typingSpeed);
    }
  }

  // Incrementing numbers logic with animation
  private animateNumbers(propertyName: 'Yearsofoperations' | 'Professionals' | 'Customers' | 'Projectsundertaken' | 'Locations' | 'Trainedmanpower', targetValue: number, duration: number): void {
    const incrementInterval = 50; // Interval in milliseconds
    const steps = duration / incrementInterval;
    const incrementValue = targetValue / steps;

    const interval = setInterval(() => {
      const currentValue = this[propertyName] as number; // Explicitly cast to number
      if (currentValue < targetValue) {
        this[propertyName] = Math.min(currentValue + incrementValue, targetValue); // Assign incremented value
      } else {
        clearInterval(interval);
        this[propertyName] = targetValue; // Ensure exact final value
      }
    }, incrementInterval);
  }

}
