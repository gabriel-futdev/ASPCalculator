import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import * as $ from 'jquery';
import { error } from 'util';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Calculator';
    toCompute = '';
    hist = '';
    temp = '';
    isFading = false;
    private _http;
    public answer: string[];

    // constructor added!
    constructor(http: Http) {
    
      this._http = http;
    }

    appendThis(appnd: string): void {
        $('#disp').show();
        $('.eq-sign').hide();
        this.checkForError();
        if (this.toCompute === '0' && appnd === '0') {
        } else if (this.toCompute === '0' && parseInt(appnd, 10) > 0) {
            this.toCompute = appnd;
        } else {
            this.toCompute += appnd;
        }
    }
    checkForError() {
        if ((this.toCompute.startsWith('Error')) ||
            (this.hist.startsWith('Error')) ||
            (this.toCompute.startsWith('Infinity')) ||
            (this.hist.startsWith('Infinity'))) {
            this.toCompute = '0';
            this.hist = '';
            $('.eq-sign').hide();
        }

    }
    del() {
        $('.eq-sign').hide();
        $('disp').show();
        if (this.hist.startsWith('Error, Invalid Format')) {
            this.toCompute = '0';
            this.hist = '';
        } else if (this.toCompute.startsWith('Infinity') || this.toCompute.startsWith('-Infinity')) {
            this.toCompute = '0';
            this.hist = '';
        } else if (this.toCompute === '') {
            this.toCompute = '0';
            this.hist = '';
        } else {
            this.toCompute = this.toCompute.slice(0, this.toCompute.length - 1);
        }
    }
    delAll() {
        this.toCompute = '0';
    }

    neg() {
        if (!this.toCompute.startsWith('-')) {
            this.toCompute = '-' + this.toCompute;
        } else {
            this.toCompute = this.toCompute.slice(1, this.toCompute.length);
        }
    }

    clear() {
        this.toCompute = '0';
        this.hist = '';
        $('.eq-sign').hide();
    }
    calculate() {
        this.checkIfNull();
        $('#disp').hide();
        $('#history').hide();
        setTimeout(this.getResult(), 100);
        setTimeout(this.displayHistory(), 500);
    }

    checkIfNull() {
        if (this.toCompute === '') {
            this.hist = '';
        }
        if (this.toCompute === '0') {
            $('.eq-sign').hide();
            console.log('should hide the equal sign');
        }
    }
    getResult() {
        this.checkForError();
        try {

            if (this.toCompute !== '' || parseFloat(this.toCompute) !== 0) {

                let newExpression: string = this.toCompute.replace( '+', '!' );
                newExpression = newExpression.replace( '-', '@' );
                newExpression = newExpression.replace( 'x', '&' );
                newExpression = newExpression.replace( '/', '$' );
                console.log( newExpression );
                this.hist = this.toCompute;
                this._http.get( '/calculate/' + newExpression ).subscribe( result => {
                    this.toCompute = result.text();
                }, error => console.error( error ) );

                
            
                $('#disp').fadeIn();
                $('.eq-sign').fadeIn();
            } else {
                this.toCompute = '0';
                $('#disp').show();
                this.hist = '';
                $('.eq-sign').hide();
                console.log('triggered! : ' + this.toCompute);
            }
        } catch (error) {
            // console.log('the value of toCompute: ' + this.toCompute);
            this.toCompute = 'Error, Invalid Format';
            this.hist = this.toCompute;
        }
    }

    displayHistory() {
        $('#history').delay(250).fadeIn('slow');
    }



    public ngOnInit() {
        //console.log('oninit()');
        $(document).ready(function () {
            $('.eq-sign').hide();
        });

        function hideButtons() {
            for (let i = 1; i <= 19; i++) {
                $('#r' + i + '').hide();
            }
        }
        function showTop() {
            $('.top').slideDown('slow');
        }
        function showButton() {
            $('#buttons').slideDown('slow');
        }
        function showButtons() {
            for (let i = 1; i <= 19; i++) {
                let a: string = '#r' + i;
                console.log(a);
                $(a).show('slow');
            }
            $('#disp').show();
        }
    }
}



