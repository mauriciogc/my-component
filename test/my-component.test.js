/* global describe, it*/
import {
	html,
	fixture,
	expect,
	elementUpdated,
	oneEvent,
} from "@open-wc/testing";

import "../my-component.js";

describe("has properties and attributes and functions", () => {
	it("has a type properties", async () => {
		const el = await fixture(html` <my-component></my-component> `);

		expect(el.title).to.be.a("string");
		expect(el.items).to.be.an("array");
		expect(el.addClass).to.be.a("boolean");

		expect(el._onClickItem).to.be.a("function");
		expect(el._onAddItem).to.be.a("function");
		expect(el._onRemoveLastItem).to.be.a("function");
		expect(el._onRemoveFirstItem).to.be.a("function");
		expect(el._onCleanList).to.be.a("function");
	});

	it("has a default value properties", async () => {
		const el = await fixture(html` <my-component></my-component> `);

		expect(el.title).to.equal("");
		expect(el.items).to.have.lengthOf(0);
		expect(el.addClass).to.be.false;
	});
});

describe("properties and attributes changed", () => {
	it("has changed properties at the beginning", async () => {
		const el = await fixture(html`
			<my-component
				.title=${"My title"}
				.items=${[1, 2, 3]}
				?addClass=${true}
			></my-component>
		`);

		expect(el.title).to.equal("My title");
		expect(el.items[0]).to.equal(1);
		expect(el.items).to.have.lengthOf(3);
		expect(el.addClass).to.be.true;
	});

	it("has changed properties", async () => {
		const el = await fixture(html` <my-component></my-component> `);
		el.title = "Hello";
		el.items = ["a", "b", "c", "d"];
		el.addClass = true;

		await elementUpdated(el);

		expect(el.title).to.equal("Hello");
		expect(el.items[0]).to.equal("a");
		expect(el.items).to.have.lengthOf(4);
		expect(el.addClass).to.be.true;
	});
});

describe("properties and attributes changed", () => {
	it("has class for h1", async () => {
		const el = await fixture(html`
			<my-component ?addClass=${true}></my-component>
		`);

		const h1 = el.shadowRoot.querySelector("h1");
		expect(h1).to.have.class("h1Cls");
	});

	it("has no class for h1", async () => {
		const el = await fixture(html` <my-component></my-component> `);

		const h1 = el.shadowRoot.querySelector("h1");
		expect(h1).to.have.not.class("h1Cls");
	});

	it("has title for h1", async () => {
		const el = await fixture(
			html` <my-component .title=${"Hello World!"}></my-component> `
		);
		const h1 = el.shadowRoot.querySelector("h1");
		expect(h1.innerText).to.have.equal("Hello World!");
	});
});

describe("has all actions", () => {
	it("has button btnAddItem", async () => {
		const el = await fixture(html` <my-component></my-component> `);

		expect(el.items).to.have.lengthOf(0);
		const btn = el.shadowRoot.querySelector("#btnAddItem");

		btn.click();
		expect(el.items).to.have.lengthOf(1);
	});

	it("has button btnRemoveLastItem", async () => {
		const items = [1, 2, 3];
		const el = await fixture(html` <my-component></my-component> `);
		const btn = el.shadowRoot.querySelector("#btnRemoveLastItem");

		btn.click();
		expect(el.items).to.have.lengthOf(0);

		el.items = items;
		await elementUpdated(el);
		expect(el.items).to.have.lengthOf(3);

		btn.click();
		expect(el.items).to.have.lengthOf(2);
		expect(el.items[0]).to.equals(1);
	});

	it("has button btnRemoveFirstItem", async () => {
		const items = [1, 2, 3];
		const el = await fixture(html` <my-component></my-component> `);
		const btn = el.shadowRoot.querySelector("#btnRemoveFirstItem");

		btn.click();
		expect(el.items).to.have.lengthOf(0);

		el.items = items;
		await elementUpdated(el);
		expect(el.items).to.have.lengthOf(3);

		btn.click();
		expect(el.items).to.have.lengthOf(2);
		expect(el.items[0]).to.equals(2);
	});

	it("has button btnCleanList", async () => {
		const items = [1, 2, 3, 4, 5];
		const el = await fixture(html` <my-component></my-component> `);
		const btn = el.shadowRoot.querySelector("#btnCleanList");

		btn.click();
		expect(el.items).to.have.lengthOf(0);

		el.items = items;
		await elementUpdated(el);
		expect(el.items).to.have.lengthOf(5);

		btn.click();
		expect(el.items).to.have.lengthOf(0);
	});

	it("has button li", async () => {
		const items = [1, 2, 3, 4, 5];
		const el = await fixture(
			html` <my-component .items=${items}></my-component> `
		);
		const list = el.shadowRoot.querySelectorAll("li");
		list[0].click();
		expect(el.items).to.have.lengthOf(5);
	});
});

describe("has all actions for DOM", () => {
	it("has list with button btnAddItem ", async () => {
		const el = await fixture(html` <my-component></my-component> `);
		const fnLi = (el) => el.shadowRoot.querySelectorAll("li");
		const btn = el.shadowRoot.querySelector("#btnAddItem");
		let list = fnLi(el);

		expect(list).to.have.lengthOf(0);
		btn.click();
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(1);
	});

	it("has list with button btnRemoveLastItem", async () => {
		const items = [1, 2, 3];
		const el = await fixture(html` <my-component></my-component> `);
		const fnLi = (el) => el.shadowRoot.querySelectorAll("li");
		const btn = el.shadowRoot.querySelector("#btnRemoveLastItem");
		let list = fnLi(el);

		expect(list).to.have.lengthOf(0);
		btn.click();
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(0);

		el.items = items;
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(3);

		btn.click();
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(2);
		expect(list[0].innerText).to.equal("1");
	});

	it("has list with button btnRemoveFirstItem", async () => {
		const items = [1, 2, 3];
		const el = await fixture(html` <my-component></my-component> `);
		const fnLi = (el) => el.shadowRoot.querySelectorAll("li");
		const btn = el.shadowRoot.querySelector("#btnRemoveFirstItem");
		let list = fnLi(el);

		expect(list).to.have.lengthOf(0);
		btn.click();
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(0);

		el.items = items;
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(3);

		btn.click();
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(2);
		expect(list[0].innerText).to.equal("2");
	});

	it("has button btnCleanList", async () => {
		const items = [1, 2, 3, 4, 5];
		const el = await fixture(html` <my-component></my-component> `);
		const fnLi = (el) => el.shadowRoot.querySelectorAll("li");
		const btn = el.shadowRoot.querySelector("#btnCleanList");
		let list = fnLi(el);

		expect(list).to.have.lengthOf(0);
		btn.click();
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(0);

		el.items = items;
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(5);

		btn.click();
		await elementUpdated(el);
		list = fnLi(el);
		expect(list).to.have.lengthOf(0);
	});

	it("has li", async () => {
		const items = [1, 2, 3, 4, 5];
		const el = await fixture(
			html` <my-component .items=${items}></my-component> `
		);
		const fnLi = (el) => el.shadowRoot.querySelectorAll("li");
		let list = fnLi(el);

		expect(list[2].innerText).to.equal("3");
	});
});

describe("dispatches a custom events", () => {
	it("has custom-event-li", async () => {
		const items = ["Mauricio", "Gabriela", "Ricardo"];
		const el = await fixture(
			html` <my-component .items=${items}></my-component> `
		);
		const list = el.shadowRoot.querySelectorAll("li");

		setTimeout(() => list[0].click());
		const data = await oneEvent(el, "custom-event-li");
		expect(data).to.exist;
		expect(data).to.have.property("detail", "Mauricio");
	});
});

describe("Other branches", () => {
	it("ally", async () => {
		const el = await fixture(
			html` <my-component .title=${"My title"}></my-component> `
		);
		await expect(el).to.be.accessible();
	});
});
