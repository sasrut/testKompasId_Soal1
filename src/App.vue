<template></template>

<script>
var items = [
  {
    id: 1,
    name: "Sayur Bening",
    cost: 76023,
    created_at: "2021-02-05 09:03:03",
  },
  { id: 2, name: "Cireng", cost: 32503, created_at: "2021-02-11 21:26:36" },
  { id: 3, name: "Mie Goreng", cost: 86376, created_at: "2021-02-18 19:27:32" },
  {
    id: 4,
    name: "Ayam Geprek",
    cost: 11452,
    created_at: "2021-02-03 20:07:53",
  },
  { id: 5, name: "Batagor", cost: 44933, created_at: "2021-02-18 20:24:58" },
  {
    id: 6,
    name: "Soto Kuning",
    cost: 30345,
    created_at: "2021-02-05 23:54:06",
  },
  { id: 7, name: "Ikan Bakar", cost: 51092, created_at: "2021-02-08 15:49:07" },
  {
    id: 8,
    name: "Sayur Lodeh",
    cost: 94444,
    created_at: "2021-02-09 02:16:56",
  },
  { id: 9, name: "Tahu Bulat", cost: 28385, created_at: "2021-02-06 17:54:22" },
  { id: 10, name: "Gado-Gado", cost: 89612, created_at: "2021-02-05 13:35:09" },
  { id: 11, name: "Sop Ayam", cost: 74896, created_at: "2021-02-13 07:07:02" },
  {
    id: 12,
    name: "Nasi Kuning",
    cost: 44837,
    created_at: "2021-02-07 04:05:39",
  },
];

var grouped = _.groupBy(items, function (item) {
  return item.created_at;
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
