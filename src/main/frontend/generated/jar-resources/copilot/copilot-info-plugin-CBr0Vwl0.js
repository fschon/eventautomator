import { I as v, b as u, x as i, J as m, E as I, T as c, t as w } from "./copilot-rC7pmhRo.js";
import { r as h } from "./state-DiVdJUTA.js";
import { B as b } from "./base-panel-BMdLsSpy.js";
import { a as A } from "./copilot-notification-Bapku6Qz.js";
var d = /* @__PURE__ */ ((e) => (e.ACTIVE = "active", e.INACTIVE = "inactive", e.UNAVAILABLE = "unavailable", e.ERROR = "error", e))(d || {});
const y = "copilot-info-panel{--dev-tools-red-color: red;--dev-tools-grey-color: gray;--dev-tools-green-color: green;position:relative}copilot-info-panel div.info-tray{display:flex;flex-direction:column;gap:10px}copilot-info-panel dl{display:grid;grid-template-columns:auto auto;gap:0;margin:0}copilot-info-panel dl>dt,copilot-info-panel dl>dd{padding:3px 10px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}copilot-info-panel dd.live-reload-status>span{overflow:hidden;text-overflow:ellipsis;display:block;color:var(--status-color)}copilot-info-panel dd span.hidden{display:none}copilot-info-panel dd span.true{color:var(--dev-tools-green-color);font-size:large}copilot-info-panel dd span.false{color:var(--dev-tools-red-color);font-size:large}";
var k = Object.defineProperty, j = Object.getOwnPropertyDescriptor, g = (e, t, n, p) => {
  for (var o = p > 1 ? void 0 : p ? j(t, n) : t, r = e.length - 1, l; r >= 0; r--)
    (l = e[r]) && (o = (p ? l(t, n, o) : l(o)) || o);
  return p && o && k(t, n, o), o;
};
const a = window.Vaadin.devTools;
let f = class extends b {
  constructor() {
    super(...arguments), this.serverInfo = [], this.clientInfo = [{ name: "Browser", version: navigator.userAgent }], this.handleServerInfoEvent = (e) => {
      const t = JSON.parse(e.data.info);
      this.serverInfo = t.versions, this.jdkInfo = t.jdkInfo, this.updateCopilotInfo(), v().then((n) => {
        n && (this.clientInfo.unshift({ name: "Vaadin Employee", version: "true", more: void 0 }), this.requestUpdate("clientInfo"));
      });
    };
  }
  connectedCallback() {
    super.connectedCallback(), this.onCommand("copilot-info", this.handleServerInfoEvent), this.reaction(
      () => u.idePluginActive,
      () => {
        this.updateCopilotInfo(), this.requestUpdate("serverInfo");
      }
    );
  }
  updateCopilotInfo() {
    const e = this.getIndex("Copilot IDE Plugin"), t = String(u.idePluginActive);
    let n;
    u.idePluginActive || (n = i`<a
        href="https://plugins.jetbrains.com/plugin/23758-vaadin"
        target="_blank"
        @click="${this.getPluginClicked}"
        >Get IntelliJ plugin</a
      >`), this.serverInfo[e].version = t, this.serverInfo[e].more = n;
  }
  getPluginClicked() {
    return m("get-plugin"), !1;
  }
  getIndex(e) {
    return this.serverInfo.findIndex((t) => t.name === e);
  }
  render() {
    const e = `Java ${a.javaStatus} ${a.conf.backend ? `(${a.conf.backend})` : ""};`, t = `Front end ${a.frontendStatus}`;
    return i`<style>
        ${y}
      </style>
      <copilot-copy .text=${() => this.getInfoForClipboard()}></copilot-copy>
      <div class="info-tray">
        <dl>
          ${[...this.serverInfo, ...this.clientInfo].map(
      (n) => i`
              <dt>${n.name}</dt>
              <dd title="${n.version}" style="${n.name === "Java Hotswap" ? "white-space: normal" : ""}">
                ${n.name === "Java Hotswap" ? this.renderJavaHotswap() : this.renderVersion(n.version)}
                ${n.more}
              </dd>
            `
    )}
          <dt>
            Live reload
            <label class="switch">
              <input
                id="toggle"
                type="checkbox"
                ?disabled=${!a.conf.enable || (a.frontendStatus === d.UNAVAILABLE || a.frontendStatus === d.ERROR) && (a.javaStatus === d.UNAVAILABLE || a.javaStatus === d.ERROR)}
                ?checked="${a.frontendStatus === d.ACTIVE || a.javaStatus === d.ACTIVE}"
                @change=${(n) => a.setActive(n.target.checked)} />
              <span class="slider"></span>
            </label>
          </dt>
          <dd class="live-reload-status">
            <span title="${e}" style="--status-color: ${a.getStatusColor(a.javaStatus)}">
              ${e}
            </span>
            <span
              title="${t}"
              style="--status-color: ${a.getStatusColor(a.frontendStatus)}">
              ${t}
            </span>
          </dd>
        </dl>
      </div>`;
  }
  renderVersion(e) {
    return e === "false" ? s(!1) : e === "true" ? s(!0) : e;
  }
  getInfoForClipboard() {
    const e = this.renderRoot.querySelectorAll(".info-tray dt"), p = Array.from(e).map((o) => ({
      key: o.textContent.trim(),
      value: o.nextElementSibling.textContent.trim()
    })).filter((o) => o.key !== "Live reload").filter((o) => !o.key.startsWith("Vaadin Emplo")).map((o) => {
      const { key: r } = o;
      let { value: l } = o;
      return r === "Copilot IDE Plugin" ? l = String(u.idePluginActive) : r === "Java Hotswap" && (l = String(l.includes("JRebel is in use") || l.includes("HotswapAgent is in use"))), `${r}: ${l}`;
    }).join(`
`);
    return A({
      type: I.INFORMATION,
      message: "Environment information copied to clipboard",
      dismissId: "versionInfoCopied"
    }), p.trim();
  }
  renderJavaHotswap() {
    if (!this.jdkInfo)
      return c;
    const e = this.jdkInfo.extendedClassDefCapable && this.jdkInfo.runningWithExtendClassDef && this.jdkInfo.hotswapAgentFound && this.jdkInfo.runningWitHotswap && this.jdkInfo.hotswapAgentPluginsFound, t = this.jdkInfo.jrebel;
    return !this.jdkInfo.extendedClassDefCapable && !t ? i`<details>
        <summary>${s(!1)} No Hotswap solution in use</summary>
        <p>To enable hotswap for Java, you can either use HotswapAgent or JRebel.</p>
        <p>HotswapAgent is an open source project that utilizes the JetBrains Runtime (JDK).</p>
        <ul>
          <li>If you are running IntelliJ, edit the launch configuration to use the bundled JDK.</li>
          <li>
            Otherwise, download it from
            <a target="_blank" href="https://github.com/JetBrains/JetBrainsRuntime/releases"
              >the JetBrains release page</a
            >
            to get started.
          </li>
        </ul>
        <p>
          JRebel is a commercial solution available from
          <a target="_blank" href="https://www.jrebel.com/">jrebel.com</a>
        </p>
      </details>` : t ? i`${s(!0)} JRebel is in use` : e ? i`${s(!0)} HotswapAgent is in use` : i`<details>
      <summary>${s(!1)} HotswapAgent is partially enabled</summary>
      <ul style="margin:0;padding:0">
        <li>${s(this.jdkInfo.extendedClassDefCapable)} JDK supports hotswapping</li>
        <li>
          ${s(this.jdkInfo.runningWithExtendClassDef)} JDK hotswapping
          enabled${this.jdkInfo.runningWithExtendClassDef ? c : i`<br />Add the <code>-XX:+AllowEnhancedClassRedefinition</code> JVM argument when launching the
                application`}
        </li>
        <li>
          ${s(this.jdkInfo.hotswapAgentFound)} HotswapAgent
          installed${this.jdkInfo.hotswapAgentFound ? c : i`<br /><a target="_blank" href="https://github.com/HotswapProjects/HotswapAgent/releases"
                  >Download the latest HotswapAgent</a
                >
                and place it in <code>${this.jdkInfo.hotswapAgentLocation}</code>`}
        </li>
        <li>
          ${s(this.jdkInfo.runningWitHotswap)} HotswapAgent configured
          ${this.jdkInfo.runningWitHotswap ? c : i`<br />Add the <code>-XX:HotswapAgent=fatjar</code> JVM argument when launching the application`}
        </li>
        <li>
          ${s(this.jdkInfo.hotswapAgentPluginsFound)} Vaadin HotswapAgent plugin available
          ${this.jdkInfo.hotswapAgentPluginsFound ? c : i`<br />Add src/main/resources/hotswap-agent.properties containing
                <code class="codeblock"
                  ><copilot-copy></copilot-copy>pluginPackages=com.vaadin.hilla.devmode.hotswapagent
                  disabledPlugins=vaadin # The Vaadin/Flow plugin causes extra reloads if enabled</code
                >
                and restart the application`}
        </li>
      </ul>
    </details> `;
  }
};
g([
  h()
], f.prototype, "serverInfo", 2);
g([
  h()
], f.prototype, "clientInfo", 2);
g([
  h()
], f.prototype, "jdkInfo", 2);
f = g([
  w("copilot-info-panel")
], f);
const $ = {
  header: "Info",
  expanded: !0,
  draggable: !0,
  panelOrder: 15,
  panel: "right",
  floating: !1,
  tag: "copilot-info-panel"
}, C = {
  init(e) {
    e.addPanel($);
  }
};
window.Vaadin.copilot.plugins.push(C);
function s(e) {
  return e ? i`<span class="true">☑</span>` : i`<span class="false">☒</span>`;
}
export {
  f as CopilotInfoPanel
};
