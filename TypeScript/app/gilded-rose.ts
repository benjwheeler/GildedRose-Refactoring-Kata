export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

interface IGildedRose {
  items: Array<Item>;
  updateQuality: () => Array<Item>;
}

export class GildedRose implements IGildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private coerceQuality: (q: number) => number = quality =>
    Math.min(50, Math.max(0, quality));

  private updateGenericItem(item: Item): Item {
    return {
      name: item.name,
      sellIn: item.sellIn - 1,
      quality: this.coerceQuality(item.quality - 1)
    };
  }

  private updateAgedBrie(item: Item): Item {
    return {
      name: item.name,
      sellIn: item.sellIn - 1,
      quality: this.coerceQuality(item.quality + 1)
    };
  }

  private updateSulfuras(item: Item): Item {
    return {
      name: item.name,
      sellIn: item.sellIn,
      quality: 80
    };
  }

  private updateBackstagePasses: (item: Item) => Item = item => {
    const newSellIn = item.sellIn - 1;
    let quality: number;

    if (newSellIn < 10 && newSellIn >= 5) {
      quality = item.quality + 2;
    } else if (newSellIn < 5 && newSellIn >= 0) {
      quality = item.quality + 3;
    } else if (newSellIn < 0) {
      quality = 0;
    } else {
      quality = item.quality + 1;
    }

    return {
      name: item.name,
      sellIn: newSellIn,
      quality: this.coerceQuality(quality)
    };
  };

  private updateConjured: (item: Item) => Item = item => ({
    name: item.name,
    sellIn: item.sellIn - 1,
    quality: this.coerceQuality(item.quality - 2)
  });

  updateQuality() {
    this.items = this.items.map(item => {
      switch (item.name) {
        case "Aged Brie":
          return this.updateAgedBrie(item);

        case "Sulfuras, Hand of Ragnaros":
          return this.updateSulfuras(item);

        case "Backstage passes to a TAFKAL80ETC concert":
          return this.updateBackstagePasses(item);

        case "Conjured Mana Cake":
          return this.updateConjured(item);

        default:
          return this.updateGenericItem(item);
      }
    });

    return this.items;
  }
}
