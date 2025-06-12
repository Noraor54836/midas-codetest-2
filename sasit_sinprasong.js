// function need to find min enery that take input start to input target
// all input have 1.start-int 2.station-array 3.target-array 4.shop-int
// every input can be 0 0r more but not decimal
// before fo to target function need to go to all shop first
// every 1 km need to spend 1 energy
// but if use station will not use energy but can use only at stations
// need to find min energy

// find min
function minEnergy(start, shops, stations, target) {
  //use Dijkstra algorithm
  //permutate array

  const station = new Set(stations);

  const distance = (a, b) => {
    // target has station == dont use energy
    if (station.has(a) && station.has(b)) {
      return 0;
    }

    return Math.abs(a - b);
  };

  function permute(shoparray) {
    if (shoparray.length === 0) {
      return [[]];
    }

    const result = [];

    for (let i = 0; i < shoparray.length; i++) {
      const rest = shoparray.slice(0, i).concat(shoparray.slice(i + 1));
      //   console.log(rest, "rest");

      for (const perm of permute(rest)) {
        result.push([shoparray[i], ...perm]);
        // console.log(result, perm, "rest of permute");
      }
    }

    return result;
  }

  let min = Infinity;

  for (const order in permute(shops)) {
    let total = 0;
    let now = start;
    console.log(order, "order in permute");

    for (const shop in order) {
      //   console.log(shop, "shop in order");
      total += distance(now, shop);
      //   console.log(total, "total distance1");
      now = shop;
    }

    total += distance(now, target);
    // console.log(total, "total distance2");

    if (total < min) {
      min = total;
    }
  }

  return min;
}

function main() {
  let start = 1;
  let shops = [2, 4, 6];
  let stations = [1, 3, 5];
  let target = 7;

  const result = minEnergy(start, shops, stations, target);
  console.log(result, "answer");
}

main();
