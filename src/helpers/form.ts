export  type FormControl = {
	name: string,
	label: string,
	type: string,
}

export type  FormValue = Record<string, string>
export const getFormValue = (form: HTMLFormElement, controls: FormControl[]):FormValue =>  {
	let data: FormValue = {};
	controls.forEach(control => {
		data[control.name] = form[control.name].value
	})
	return data;
}
