import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.reservationForm = this.fb.group({
      destination: ['', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      passengers: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      email: ['', [Validators.required, Validators.email]]
    });

    const savedData = localStorage.getItem('reservationData');
    if (savedData) {
      this.reservationForm.setValue(JSON.parse(savedData));
    }

    this.reservationForm.valueChanges.subscribe((value) => {
      localStorage.setItem('reservationData', JSON.stringify(value));
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log(this.reservationForm.value);
      alert('Reserva enviada com sucesso!');
      localStorage.removeItem('reservationData');
      this.reservationForm.reset();
    }
  }
}
