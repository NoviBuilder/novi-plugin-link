const React = novi.react.React;
import Body from "./editor/Body";
const Icons = novi.ui.icons;
const messages = novi.language.getDataByKey("novi-plugin-link");
const EditorItem = {
    trigger: [Icons.ICON_LINK],
    tooltip: messages.editor.tooltip,
    header: [Icons.ICON_LINK, <span>{messages.editor.header}</span>],
    body: [<Body/>],
    closeIcon: "submit",
    width: 360,
    height: 160,
    title: messages.editor.title,
    onSubmit: changeLink
};

export default EditorItem;

function changeLink(headerStates, bodyStates) {
    let state = bodyStates[0];
    if (state.href === state.value) return;
    novi.element.setAttribute(state.element, "href", state.value);
}