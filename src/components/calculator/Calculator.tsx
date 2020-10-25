import {Component} from "vue-property-decorator";
import {VueComponent} from "@/shims-vue";

import styles from './Calculator.css?module';
import {Store} from "@/store";
import {useStore} from "vuex-simple";
import CalculatorButton, {Operation} from "@/components/calculator-button/CalculatorButton";

@Component
export default class Calculator extends VueComponent {
    public store: Store = useStore(this.$store);

    public get buffer() {
        return this.store.normalizedBuffer;
    }

    public get result() {
        return this.store.normalizedResult;
    }

    public addDigit(digit: number) {
        this.store.addDigit(digit);
    }

    public addOperation(operation: Operation) {
        this.store.addOperation(operation);
    }

    public clear() {
        this.store.clear();
    }

    async compute() {
        await this.store.compute();
    }

    render() {
        return (
            <div class={styles.calculator}>
                <div class={`${styles.screen} ${styles.counter}`}>
                    {this.buffer}
                </div>
                <div class={`${styles.screen} ${styles.result}`}>
                    {this.result}
                </div>

                <div class={styles.pad}>
                    <CalculatorButton value={7} onClick={() => this.addDigit(7)} />
                    <CalculatorButton value={8} onClick={() => this.addDigit(8)} />
                    <CalculatorButton value={9} onClick={() => this.addDigit(9)} />
                    <CalculatorButton value={"C"} onClick={() => this.clear()} />

                    <CalculatorButton value={4} onClick={() => this.addDigit(4)} />
                    <CalculatorButton value={5} onClick={() => this.addDigit(5)} />
                    <CalculatorButton value={6} onClick={() => this.addDigit(6)} />
                    <CalculatorButton value={"-"} onClick={() => this.addOperation("-")} />

                    <CalculatorButton value={1} onClick={() => this.addDigit(1)} />
                    <CalculatorButton value={2} onClick={() => this.addDigit(2)} />
                    <CalculatorButton value={3} onClick={() => this.addDigit(3)} />
                    <CalculatorButton value={"+"} onClick={() => this.addOperation("+")} />

                    <CalculatorButton value={0} onClick={() => this.addDigit(0)} />
                    <CalculatorButton value={"="} onClick={() => this.compute()} />
                </div>
            </div>
        )
    }
}