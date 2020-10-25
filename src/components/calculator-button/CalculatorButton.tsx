import {Component, Prop} from "vue-property-decorator";
import {VueComponent} from "@/shims-vue";
import styles from "./CalculatorButton.css?module";

export type Operation = "+" | "-";
export type SpecialOperation = "C" | "=";

interface Props {
    value: number | Operation | SpecialOperation;
    onClick: () => void;
}

@Component
export default class CalculatorButton extends VueComponent<Props> {
    @Prop({
        type: [Number, String],
        required: true,
        validator: (value) => ["+", "-", "C", "="].includes(value) || (value >= 0 && value < 10)
    })
    private value!: number;

    @Prop({type: Boolean, default: false})
    private isOperation!: boolean;

    public getButtonClass() {
        if (this.isOperation)
            return `${styles['is-unselectable']} ${styles.button} ${styles['button-operation']}`;
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
            <div class={this.getButtonClass()} onclick={() => this.$emit('click')}>
                <span class={this.getTextClass}>{this.value}</span>
            </div>
        )
    }
}