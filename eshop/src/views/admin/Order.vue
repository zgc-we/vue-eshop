<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="desserts"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="id"
    show-expand
    disable-pagination
    hide-default-footer
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Order</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-data-table
          :headers="orderDetail_header"
          :items="item.OrderDetails"
          class="elevation-1"
          disable-pagination
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Order Details</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:[`item.total`]="{ item }">
            {{item.price * item.quantity}}
          </template>
        </v-data-table>
        <div class="text-center pt-2">
          <v-row>
            <v-col>

            </v-col>
            <v-col>
              <p>Total: {{total(item)}}</p>
            </v-col>
          </v-row>
        </div>
      </td>
    </template>
  </v-data-table>
</template>
<script>
  import OrderService from '@/services/Admin/OrderService'
  export default {
    data () {
      return {
        expanded: [],
        singleExpand: true,
        dessertHeaders: [
          {
            text: 'Id',
            align: 'start',
            sortable: false,
            value: 'id'
          },
          { text: 'Email', sortable: false, value: 'email' },
          { text: 'Status', sortable: false, value: 'status' },
          { text: 'Create At', sortable: false, value: 'createdAt' },
          { text: 'Shipping Address', sortable: false, value: 'shipping_address' },
          { text: '', value: 'data-table-expand' }
        ],
        orderDetail_header: [
          {
            text: 'id',
            align: 'start',
            sortable: false,
            value: 'id'
          },
          { text: 'price', sortable: false, value: 'price' },
          { text: 'quantity', sortable: false, value: 'quantity' },
          { text: 'Product name', sortable: false, value: 'Product.name' },
          { text: 'Subtotal', value: 'total' }
        ],
        desserts: []
      }
    },
    created () {
      this.initialization()
    },
    methods: {
      async initialization () {
        let res = await OrderService.findAll()
        this.desserts = res.data
        console.log(this.desserts)
      },
      total (item) {
        let sum = 0
        item.OrderDetails.forEach(element => {
          sum += element.price * element.quantity
        })
        return sum
      }
    }
  }
</script>
