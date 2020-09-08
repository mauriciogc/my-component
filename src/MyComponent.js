/* global CustomEvent, window*/
import { html, css, LitElement } from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";

const tagName = "my-component";
export class MyComponent extends LitElement {
	static get styles() {
		return css`
			:host {
				display: block;
				padding: 25px;
				color: var(--my-component-text-color, #000);
			}

			ul {
				color: var(--my-component-ul-text-color, #000);
			}
		`;
	}
	static get properties() {
		return {
			title: { type: String },
			items: { type: Array },
			addClass: { type: Boolean },
		};
	}
	constructor() {
		super();
		this.title = "";
		this.items = [];
		this.addClass = false;
	}
	render() {
		return html`
			<h1 class=${ifDefined(this.addClass ? "h1Cls" : undefined)}>
				${this.title}
			</h1>
			<div>
				<ul>
					${this.items.map(
						(item) =>
							html`<li @click=${(e) => this._onClickItem(e, item)}>${item}</li>`
					)}
				</ul>
			</div>
			<div>
				<button id="btnAddItem" @click=${this._onAddItem}>Add Item</button>
				<button id="btnRemoveLastItem" @click=${this._onRemoveLastItem}>
					Remove last Item
				</button>
				<button id="btnRemoveFirstItem" @click=${this._onRemoveFirstItem}>
					Remove first Item
				</button>
				<button id="btnCleanList" @click=${this._onCleanList}>
					Clean List
				</button>
			</div>
		`;
	}
	_onClickItem(e, name) {
		this.dispatchEvent(
			new CustomEvent("custom-event-li", {
				detail: name,
			})
		);
	}
	_onAddItem() {
		this.items = [...this.items, Math.random()];
	}

	_onRemoveLastItem() {
		if (this.items.length >= 1) {
			this.items.pop();
			this.items = [...this.items];
		}
	}
	_onRemoveFirstItem() {
		if (this.items.length >= 1) {
			this.items.shift();
			this.items = [...this.items];
		}
	}

	_onCleanList() {
		if (this.items.length >= 5) {
			this.items = [];
		}
	}
}

window.customElements.define(tagName, MyComponent);
