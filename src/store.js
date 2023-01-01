import { reactive } from 'vue'

export const store = reactive({
  selectedNode: null,
  define: false,
  showVerblist: false,
  verbTree: [
      {
        value: 'cur',
        text: 'cur',
        children: [
          {
            value: 'cur-isteach',
            text: 'isteach',
            meanings: [{value: "put in"}, {value: "pass (time)"}, {value: "intervene"}],
            children: [{
              value: 'cur-isteach-ar',
              text: 'ar',
              meanings: [{value: "apply"}, {value: "interfere with"}, {value: "inconvenience"}]
            }]
          },
          { value: 'cur-le', text: 'le' }
        ]
      },
      {
        value: 'bain',
        text: 'bain',
        children: [
          { value: 'bain-as', text: 'as', meanings: ['4', '5'] },
          { value: 'bain-isteach', text: 'isteach' }
        ]
      }
    ]
})
