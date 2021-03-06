import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domian/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    cn: '满足感在于不断的努力，而不是现有成就。全新努力定会胜利美满。',
    en: 'Satisfction lies in the effort, not in the attainment. Full effort is full victory.',
    pic: '/assets/img/quote_fallback.jpg'
  };

  constructor(private fb: FormBuilder, private quoteService$: QuoteService) { 
    this.quoteService$
      .getQuote()
      .subscribe(q => this.quote = q)
  }

  ngOnInit() {
    // this.form = new FormGroup({
    //   email: new FormControl(
    //     'xxx@xxx.com', 
    //     Validators.compose([Validators.required, Validators.email])
    //   ),
    //   password: new FormControl('', Validators.required)
    // })

    this.form = this.fb.group({
      email: ['xxxx@xxxx.xxx', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value));
    console.log(valid);
    this.form.controls['email'].setValidators(this.validate);
  }

  validate(c: FormControl): {[key: string]: any} {
    if (!c.value) {
      return null;
    }

    const pattern = /^joe+/;
    if (pattern.test(c.value)) {
      return null;
    }

    return {
      emailNotValid: 'The email must start with joe'
    }
  }

}
