import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", function() {
  describe("Aged Brie", () => {
    it("should increase in quality", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 2, 2)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(3);
    });

    it("should not increase in quality above 50", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 2, 50)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(50);
    });
  });

  describe("Sulfuras", () => {
    it("should not change either sellIn or quality", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 2, 2)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(2);
      expect(items[0].quality).to.equal(2);
    });
  });

  describe("Backstage passes", () => {
    it("Increases in quality by 1 when there is more than 10 days", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 11, 2)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(10);
      expect(items[0].quality).to.equal(3);
    });

    it("should not increase in quality above 50", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(50);
    });

    describe("Backstage passes sellIn between 10 and 6", () => {
      it("Increases in quality by 2 when sellIn is 10 days", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2)
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(4);
      });

      it("Increases in quality by 2 when sellIn is 6 days", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 6, 2)
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(5);
        expect(items[0].quality).to.equal(4);
      });
    });
    describe("Backstage passes sellIn between 5 and 0", () => {
      it("Increases in quality by 3 when sellIn equals to 5 days", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2)
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(5);
      });

      it("Increases in quality by 3 when sellIn equals to 1 days", () => {
        const gildedRose = new GildedRose([
          new Item("Backstage passes to a TAFKAL80ETC concert", 1, 2)
        ]);
        const items = gildedRose.updateQuality();

        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(5);
      });
    });

    it("Quality is 0 when sellIn equals or less than 0", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 2)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe("Other generic items", () => {
    it("Quality descreases by 1 and sellIn decreases by 1", () => {
      const gildedRose = new GildedRose([
        new Item("Elixir of the Mongoose", 2, 2)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(1);
    });

    it("Quality cannot be negative", () => {
      const gildedRose = new GildedRose([
        new Item("Elixir of the Mongoose", 2, 0)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe("Conjured", () => {
    it("Quality decreases by 2", () => {
      const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 2, 4)]);
      const items = gildedRose.updateQuality();

      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(2);
    });
  });
});
