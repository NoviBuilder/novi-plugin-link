const React = novi.react.React;
import Body from "./editor/Body";
const Icons = novi.ui.icons;
const messages = novi.language.getDataByKey("novi-plugin-link");
const EditorItem = {
    trigger: Icons.ICON_LINK,
    tooltip: messages.editor.tooltip,
    header: [Icons.ICON_LINK, <span>{messages.editor.header}</span>],
    body: [<Body/>],
    closeIcon: "submit",
    width: 360,
    height: 200,
    title: messages.editor.title,
    onSubmit: changeLink
};

export default EditorItem;

function changeLink(headerStates, bodyStates) {
    let state = bodyStates[0];
    if (state.href === state.value && state.initBlank === state.blank) return;
    if (state.href !== state.value){
        novi.element.setAttribute(state.element, "href", state.value);
    }
    if (state.initBlank !== state.blank){
        if (state.blank){
            novi.element.setAttribute(state.element, "target", "_blank");
        }
        else {
            novi.element.removeAttribute(state.element, "target");
        }
    }

}