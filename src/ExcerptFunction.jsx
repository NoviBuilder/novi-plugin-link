export function isLinkReplaceble(element){
    if (!element || !element.hasAttribute("href") || !novi.element.hasAttribute(element, "href")) return false;

    return element.getAttribute("href") === novi.element.getAttribute(element, "href");
}