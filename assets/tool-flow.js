/* ============================================================
  tool-flow.js; shared handoff between build/ and done/
  Default done path is ../done/ when called from tool/build/.
  Also provides in-tool step history so browser Back works.
  ============================================================ */
(function () {
 "use strict";

 var PREFIX = "gl_tool_result_";
 var stepListeners = {};
 var suppressPop = false;

 function saveResult(toolId, payload) {
  try {
   sessionStorage.setItem(
    PREFIX + toolId,
    JSON.stringify({
     t: Date.now(),
     data: payload
    })
   );
  } catch (e) {
   console.warn("Could not save tool result:", e);
  }
 }

 function loadResult(toolId, maxAgeMs) {
  maxAgeMs = maxAgeMs || 1000 * 60 * 60 * 6; // 6 hours
  try {
   var raw = sessionStorage.getItem(PREFIX + toolId);
   if (!raw) return null;
   var parsed = JSON.parse(raw);
   if (!parsed || !parsed.data) return null;
   if (Date.now() - (parsed.t || 0) > maxAgeMs) return null;
   return parsed.data;
  } catch (e) {
   return null;
  }
 }

 function clearResult(toolId) {
  try {
   sessionStorage.removeItem(PREFIX + toolId);
  } catch (e) {}
 }

 function goToDone(toolId, payload, donePath) {
  saveResult(toolId, payload);
  window.location.href = donePath || "../done/";
 }

 /** Scroll the active step into view without jumping to the document top. */
 function showStep(stepIds, stepId) {
  stepIds.forEach(function (id) {
   var el = document.getElementById(id);
   if (!el) return;
   el.classList.toggle("active", id === stepId);
  });
  var active = document.getElementById(stepId);
  if (active) {
   var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   active.scrollIntoView({
    behavior: reduce ? "auto" : "smooth",
    block: "start"
   });
  }
 }

 /**
  * Register a tool's step restore callback for browser Back/Forward.
  * onStep(stepId) should toggle the UI; pushStep is suppressed during restore.
  * Pass initialStep to seed history so the first Back returns to step 1.
  */
 function bindStepHistory(toolId, onStep, initialStep) {
  if (!toolId || typeof onStep !== "function") return;
  stepListeners[toolId] = onStep;
  if (initialStep && window.history && window.history.replaceState) {
   try {
    window.history.replaceState(
     { glTool: toolId, glStep: initialStep },
     "",
     window.location.href
    );
   } catch (e) {}
  }
 }

 /**
  * Push the current wizard step into browser history.
  * Skips duplicate consecutive pushes for the same tool+step.
  */
 function pushStep(toolId, stepId) {
  if (!toolId || !stepId || !window.history || !window.history.pushState) return;
  try {
   var cur = window.history.state;
   if (cur && cur.glTool === toolId && cur.glStep === stepId) return;
   if (suppressPop) return;
   window.history.pushState(
    { glTool: toolId, glStep: stepId },
    "",
    window.location.href
   );
  } catch (e) {
   /* ignore history failures (file://, etc.) */
  }
 }

 function restoreStep(toolId, stepId) {
  var fn = stepListeners[toolId];
  if (!fn) return false;
  suppressPop = true;
  try {
   fn(stepId);
  } finally {
   suppressPop = false;
  }
  return true;
 }

 window.addEventListener("popstate", function (ev) {
  var st = ev.state;
  if (!st || !st.glTool || !st.glStep) return;
  restoreStep(st.glTool, st.glStep);
 });

 window.GLFlow = {
  saveResult: saveResult,
  loadResult: loadResult,
  clearResult: clearResult,
  goToDone: goToDone,
  showStep: showStep,
  bindStepHistory: bindStepHistory,
  pushStep: pushStep,
  restoreStep: restoreStep
 };
})();
