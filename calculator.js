// 按下加減乘除按鈕後，該按鈕會變成按下狀態(藍底白字) 
// 每次計算完後，需清空輸入框的值。
// 每次計算完後都會留下歷史紀錄，記錄順序由新到舊，歷史記錄最多10筆，超過10筆時，刪除最舊的記錄。 
// 記錄需記錄在localStorage中，並在頁面載入時，將localStorage中的歷史記錄取出並顯示在頁面上。

const app = Vue.createApp({
    data() {
        return {
            inputNum1: null,
            inputNum2: null,
            result: null,
            historyList: [],
            currentOp: '',
        };
    },

    // 用生命週期HOOK去載入歷史記錄(重整不會刷掉)
    mounted() {
        this.loadHistory();
    },

    methods: {
        operator(op) {
            this.currentOp = op;
        },

        calBtn() {
            const num1 = Number(this.inputNum1);
            const num2 = Number(this.inputNum2);

            if (isNaN(num1) || isNaN(num2) || this.inputNum1 === null || this.inputNum2 === null) {
                alert('未填入數字');
                return;
            };

            if (this.currentOp === '') {
                alert('未選擇運算符號');
                return;
            };

            switch (this.currentOp) {
                case '+':
                    this.result = num1 + num2;
                    break;
                case '-':
                    this.result = num1 - num2;
                    break;
                case '*':
                    this.result = num1 * num2;
                    break;
                case '/':
                    this.result = num1 / num2;
                    break;
                default:
                    this.result = null;
                    break;
            };

            if (typeof this.result === 'number') {
                this.addHistory(`${this.inputNum1} ${this.currentOp} ${this.inputNum2} = ${this.result}`);
            }

            this.clearInput();
            this.currentOp = '';
        },

        clearInput() {
            this.inputNum1 = null;
            this.inputNum2 = null;
        },

        addHistory(record) {
            this.historyList.unshift(record);
            if (this.historyList.length > 10) {
                this.historyList.pop();
            }

            // 存到 localStorage裡
            localStorage.setItem('historyList', JSON.stringify(this.historyList));
        },

        loadHistory() {
            const savedList = localStorage.getItem('historyList');
            if (savedList) {
                this.historyList = JSON.parse(savedList);
            }
        },

        clearHistories() {
            this.historyList = [];
            localStorage.removeItem('historyList');
        }

    },
});

app.mount('#app');