// this will be the component that represents ONE individual task
// taskBoard AND taskOverview component will call this component
// those components will be making API GET calls for event info, and then the event info
// will get passed into this component(similar logic to upcoming events)

'use client'
import { useState, useEffect } from "react" // not fully sure if we need useEffect for this component...
import { event } from "../../../types"

// this component will take in eventData object as a prop 
export default function taskCard ({event}) {
    // display it onto a card
}