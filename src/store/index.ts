import Vue from 'vue'
import Vuex from 'vuex'
import {Action, createVuexStore, Getter, Mutation, State} from "vuex-simple";
import {Operation} from "@/components/calculator-button/CalculatorButton";

Vue.use(Vuex);

export class Store {
    @State()
    public buffer = "";

    @State()
    public lastSymbol = "";

    @State()
    public lastNumber = 0;

    @State()
    public computing = false;

    @State()
    public result = 0;

    @Getter()
    public get isEmptyBuffer() {
        return !this.buffer.length;
    }

    @Getter()
    public get lastSymbolIsOperation() {
        return ["+", "-"].includes(this.lastSymbol);
    }

    @Getter()
    public get normalizedBuffer() {
        return this.buffer.split(/ ([+]|[-]) /).reverse().join(" ");
    }

    @Getter()
    public get normalizedResult() {
        return this.result.toString().split("-").reverse().join("-") + " =";
    }

    @Mutation()
    public addDigit(digit: number) {
        if (this.computing) return;
        if (this.isEmptyBuffer) {
            if (digit === 0) {
                this.buffer = digit.toString();
                this.lastSymbol = digit.toString();
                this.lastNumber = digit;
                return;
            } else {
                this.buffer = digit.toString();
                this.lastSymbol = digit.toString();
                this.lastNumber = digit;
            }
        } else if (this.lastNumber === 0 && this.lastSymbol === "0") {
            this.buffer = this.buffer.substr(0, this.buffer.length - 1) + digit;
            this.lastNumber = digit
        } else if (this.lastSymbolIsOperation) {
            this.buffer += digit;
            this.lastNumber = digit;
        } else {
            this.buffer += digit;
            this.lastNumber = parseInt("" + this.lastNumber + digit);
        }
        this.lastSymbol = digit.toString();
    }

    @Mutation()
    public addOperation(operation: Operation) {
        if (this.computing) return;
        if (this.isEmptyBuffer) return;
        if (this.lastSymbolIsOperation) {
            this.buffer = this.buffer.substr(0, this.buffer.length - 2) + operation + " ";
            this.lastSymbol = operation;
        } else {
            this.buffer += " " + operation + " ";
            this.lastSymbol = operation;
            this.lastNumber = 0;
        }
    }

    @Mutation()
    public setComputing(computing: boolean) {
        this.computing = computing;
    }

    @Action()
    public async compute() {
        if (this.isEmptyBuffer || this.lastSymbolIsOperation) return;

        this.setComputing(true);
        await new Promise(r => setTimeout(r, 2000));
        let buffer = this.buffer;
        this.clear();
        this.result = eval(buffer) as number;
        this.setComputing(false);
    }

    @Mutation()
    public clear() {
        this.buffer = "";
        this.lastSymbol = "";
        this.lastNumber = 0;
        this.result = 0;
    }
}

const instance = new Store();

export default createVuexStore(instance, {
    strict: false
});
