import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-doctor',
	templateUrl: './doctor.component.html',
	styleUrls: ['./doctor.component.scss']
})


export class DoctorComponent {

	constructor(private _snackBar: MatSnackBar) {

	}

	selectedValue: string;
	items: any[] = [{
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
	}];

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
];

	check(id): void {
		console.log(id)
	}

	changeClient(inde): void {
		this.items[inde].value = false;
	}

	confirm(data, type): void {
		this._snackBar.open(`${data.name}'s Appointment ${type === 'done' ? 'confirmed' : 'rejected'}.`, "OK", {
			duration: 2000,
			horizontalPosition: "center",
			verticalPosition: "top",
		});
		this.items = this.items.filter(item => item.name !== data.name);
	}

	logout() {
		window.location.href='login';
	}
}