import {Component} from 'vue-property-decorator';

import styles from './App.css?module';
import Calculator from "@/components/calculator/Calculator";
import {VueComponent} from "@/shims-vue";

@Component
export default class App extends VueComponent {
    render() {
        return (
            <div class={styles.app}>
                <Calculator/>
            </div>
        )
    }
}
