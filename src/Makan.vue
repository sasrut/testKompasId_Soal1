<template>
  <h1>Diari Jajan Februari 2021</h1>
  <h3>Pengeluaran Bulan Ini Rp. {{ new Intl.NumberFormat().format(total) }}</h3>

  <!-- Trigger the modal with a button -->
  <div style="text-align: center">
    <button
      type="button"
      class="btn btn-info btn-lg"
      data-toggle="modal"
      data-target="#myModal"
    >
      Tambah Item
    </button>
  </div>

  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Tambah Item</h4>
        </div>

        <div class="modal-body">
          <form @submit.prevent="handleSubmit" id="myForm">
            <label class="form-label">Makanan</label>
            <input type="text" v-model="makanBaru" class="form-control" />
            <br />
            <!-- <p>tes input baru :{{ makanBaru }}</p> -->
            <label class="form-label">Harga</label>
            <input type="number" v-model="hargaBaru" class="form-control" />

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Batal
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                v-on:click="addMakanan(makanBaru, hargaBaru)"
                data-dismiss="modal"
              >
                Kirim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- TABLE -->
  <div class="table d-inline-block" v-for="x in grupMakan" :key="x.idDate">
    <table class="card_s table-responsive-sm">
      <thead>
        <tr>
          <th style="height: 40px">{{ x.tgl }}</th>
        </tr>
      </thead>
      <tbody v-for="y in x.pembayaran" :key="y.idDate">
        <tr>
          <td>{{ y.name }}</td>
          <td id="harga">Rp . {{ new Intl.NumberFormat().format(y.cost) }}</td>
        </tr>
      </tbody>
      <td></td>
      <td id="subtotal">
        Rp. {{ new Intl.NumberFormat().format(x.totalPerDay) }}
      </td>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { groupBy } from "lodash";

export default {
  data() {
    return {
      makanan: [],
      sum: 0,
      makanBaru: "",
      hargaBaru: Number,
      tanggalBaru: Date,
      today: new Date().toDateString(),

      grupMakan: [],
    };
  },
  mounted() {
    //GET JSON
    axios
      .get("http://localhost:3002/items")
      .then((response) => {
        this.convertDate(response);
      })
      .catch((err) => console.log(err.message))

      .then(function () {
        console.log("SASA SUCCESS UPDATE!!");
      })
      .catch(function () {
        console.log("SASA FAILURE UPDATE!!");
      });
  },
  computed: {
    //JUMLAH TOTAL
    total: function () {
      let sum = 0;
      this.makanan.forEach(function (item) {
        sum = parseFloat(item.cost) + sum;
      });

      return sum;
    },
  },

  methods: {
    handleSubmit() {
      this.$emit("add:inputMakan", this.makanan);
    },
    addMakanan(x, y) {
      const lastId =
        this.makanan.length > 0 ? this.makanan[this.makanan.length - 1].id : 0;
      const id = lastId + 1;
      const newMakanan = id;
      this.makanan.id = newMakanan;

      this.submitMakan().then(() => {
        this.makanBaru = "";
        this.hargaBaru = Number;

        console.log("reset abis di submit" + this.makanBaru);
      });
    },
    async submitMakan() {
      const newEntry = {
        id: this.makanan.length + 1,
        name: this.makanBaru,
        cost: Number(this.hargaBaru),
        created_at: this.today,
      };

      console.log(newEntry);

      //POST JSON
      await axios
        .post("http://localhost:3002/items", newEntry)
        .then(async () => {
          //UPDATE JSON
          await axios.get("http://localhost:3002/items").then((response) => {
            this.convertDate(response);
          });
        })
        .catch((error) => console.log(error));
    },
    //SEPERATE DATE - TIME
    convertDate(response) {
      this.makanan = response.data;
      //GROUP DATE
      const grupTemp = groupBy(response.data, (entry) =>
        new Date(entry.created_at).toDateString()
      );
      console.log(grupTemp);

      this.grupMakan = Object.keys(grupTemp)
        .map(function (idDate) {
          //SUB TOTAL
          let subTotal = grupTemp[idDate].reduce(
            (subTotal, a) => (subTotal += a.cost),
            0
          );
          console.log(subTotal);

          return {
            tgl: idDate,
            pembayaran: grupTemp[idDate],
            totalPerDay: subTotal,
          };
        })
        //SORTING
        .sort(function (a, b) {
          return new Date(b.tgl) - new Date(a.tgl);
        });
    },
  },
};
</script>

<style>
h1,
h3 {
  text-align: center;
}
button {
  margin: 0 auto;
  display: block;
  text-align: center;
  padding: 7px 15px !important;
}

#table {
  height: 100%;
  padding-top: 5%;
  text-align: center;
}
.table {
  width: 20% !important;
  padding: 1%;
  margin: 2% !important;
  box-shadow: 3px 3px 12px 3px rgba(0, 0, 1, 0.1);
}

.card_s {
  width: 90% !important;
}

#subtotal {
  font-weight: 700 !important;
  padding-top: 2%;
}

tbody {
  width: 100% !important;
  line-height: 2.5;
}
#harga {
  text-align: left;
}

.btn-info {
  background-color: #0c3cb7 !important;
  border-color: white !important;
}
</style>
