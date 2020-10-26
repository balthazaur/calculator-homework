import {Component, Prop} from "vue-property-decorator";
import {VueComponent} from "@/shims-vue";
import styles from "./CalculatorButton.css?module";

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Operation = "+" | "-";
export type SpecialOperation = "C" | "=";

type Button = Digit | Operation | SpecialOperation;

interface Props {
    value: Button;
    isOperation?: boolean;
    onClick: () => void;
}

@Component
export default class CalculatorButton extends VueComponent<Props> {
    @Prop({
        type: [Number, String],
        required: true,
        validator: (value) => ["+", "-", "C", "="].includes(value) || (value >= 0 && value < 10)
    })
    private value!: Button;

    @Prop({type: Boolean, default: false})
    private isOperation!: boolean;

    public get getButtonClass() {
        if (this.isOperation)
            return this.value === "="
                ? `${styles['is-unselectable']} ${styles.button} ${styles['button-operation']} ${styles['button-compute']}`
                : `${styles['is-unselectable']} ${styles.button} ${styles['button-operation']}`;
        else if (this.value === 0)
            return `${styles['is-unselectable']} ${styles.button} ${styles.zero} ${styles['button-digit']}`;
        else
            return `${styles['is-unselectable']} ${styles.button} ${styles['button-digit']}`;
    }

    public get getTextClass() {
        return this.isOperation ? styles.operation : styles.digit;
    }

    render() {
        return (
            <div class={this.getButtonClass} onclick={() => this.$emit('click')}>
                <span class={this.getTextClass}>{this.value}</span>
            </div>
        )
    }
}