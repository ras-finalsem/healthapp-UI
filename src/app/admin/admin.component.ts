import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetAppointmentService } from '../home/services/getAppointments.service';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {

	appointments: any;

	constructor(private _snackBar: MatSnackBar, private _getAppointmentService: GetAppointmentService) {

	}

	ngOnInit() {
		this._getAppointmentService.getAppointments('admin').subscribe(data => {
			this.appointments = Object.keys(data).map(key => {
				return {...data[key], appointmentUUID: key}
			}).filter(appointment => appointment.status === "pending");
		});
	}

	selectedValue: string
	selectedDept: String;l
	items: any[] = [
		{
			'id': 5,
			'value': true,
			'name': 'Rasagna',
			'symptom': 'She was experiencing Chest tightness along with Chest pain. She is 25 and has booked an appointment recently',
			'gender': 'Female'
		},{
			'id': 1,
			'value': true,
			'name': 'John',
			'symptom': 'He was having a discomfort in the center and left side of the chest that lasts for few minutes and goes away and comes back.',
			'gender': 'Male'
		},
		{
			'id': 2,
			'value': true,
			'name': 'Steve',
			'symptom': 'He was experiencing sudden increase in weight,and was having high blood pressure with slight weakness.',
			'gender': 'Male'
		},
		{
			'id': 3,
			'value': true,
			'name': 'Tony',
			'symptom': 'He was experiencing blury vision and a sudden loss of weight without any exercise and activity. He is young.',
			'gender': 'Male'
		},
		{
			'id': 4,
			'value': true,
			'name': 'Bruce',
			'symptom': 'He was experiencing irregular heartbeats that feel rapid, pounding and fluttering with slight weakness. He is 30.',
			'gender': 'Male'
		},
		{
			'id': 5,
			'value': true,
			'name': 'Harry',
			'symptom': 'He was experiencing scaly or rough skin with discolored pathches of skin and ulcers, a rash, which is painful or itchy.',
			'gender': 'Male'
		},
		{
			'id': 6,
			'value': true,
			'name': 'Veronica',
			'symptom': 'She was experiencing a severe pain and pressure in stomach that differs from menstrual cramps and body pains.',
			'gender': 'Female'
		},
		{
			'id': 5,
			'value': true,
			'name': 'Rachel',
			'symptom': 'She was feeling shortness of breath and uncomfortable and weak, Feeling light headed and break out into a cold sweat.',
			'gender': 'Female'
		},
		{
			'id': 6,
			'value': true,
			'name': 'Sameen Shaw',
			'symptom': 'She was having Pain in the jaw, neck, and slight discomfort in the back with shortness of breath and mild headache.',
			'gender': 'Female'
		},
		{
			'id': 5,
			'value': true,
			'name': 'Harvy Dent',
			'symptom': 'He was feeling discomfort in breathing and pain in both arms and shoulders, dizziness and light headed.',
			'gender': 'Male'
		},
		{
			'id': 6,
			'value': true,
			'name': 'Monica',
			'symptom': 'She  was experiencing irregular heartbeats that feel rapid, pounding and fluttering with slight weakness and shooting pain in left arm.',
			'gender': 'Female'
		},
		{
			'id': 6,
			'value': true,
			'name': 'Joss Carter',
			'symptom': 'She was having short of breath during exercise and activity with slight Swelling in the hands, ankles and feet.',
			'gender': 'Female'
		}
	];
	departments: any[] = [{
			'name': "Cardiology",
			'value': 'Cardiology'
		},
		{
			'name': "Clinical Nutrition & Dietetics",
			'value': 'Clinical Nutrition & Dietetics'
		},
		{
			'name': "Diabetology",
			'value': 'Diabetology'
		},
		{
			'name': "Dermatology",
			'value': 'Dermatology'
		},
		{
			'name': "Obstetrics & Gynaecology",
			'value': 'Obstetrics & Gynaecology'
		},
		{
			'name': "Emergency Medicine",
			'value': 'Emergency Medicine'
		}
	]

	check(id): void {
		console.log(id)
	}

	changeClient(inde, event): void {
		this.items[inde].value = false;
		this.selectedDept = event.value;
	}

	confirm(data): void {
        console.log("🚀 ~ file: admin.component.ts ~ line 150 ~ AdminComponent ~ confirm ~ data", data)

		this._getAppointmentService.confirmAppointment({...data, status: "confirmed"}).subscribe(response => {
			console.log("confirmAppointment response: ", response);
		});

		this.appointments = this.appointments.filter(item => data.username !== item.username);
		this._snackBar.open(`${data.username}'s Appointment forwarded to ${this.selectedDept}.`, "OK", {
			duration: 2000,
			horizontalPosition: "center",
			verticalPosition: "top",
		});
		
	}

	logout() {
		window.location.href='login';
	}
}