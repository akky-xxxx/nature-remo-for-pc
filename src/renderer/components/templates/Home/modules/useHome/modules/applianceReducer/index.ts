// import
import arrayMove from "array-move"

// import
import { Appliance } from "../../../../../../../shared/types/api"

// main
type Action = {
  type: string
  payload: Record<string, any>
}
type ApplianceReducer = (state: Appliance[], action: Action) => Appliance[]
export const applianceReducer: ApplianceReducer = (state, action) => {
  switch (action.type) {
    case "changeOrder":
      return (() => {
        const {
          payload: { oldIndex, newIndex },
        } = action
        if (oldIndex === newIndex) return state
        return arrayMove([...state], oldIndex, newIndex).filter(Boolean)
      })()
    case "changeApplianceName":
      return (() => {
        const {
          payload: { newName, targetId },
        } = action
        return state.map((appliance) => {
          if (appliance.id !== targetId) return appliance
          return {
            ...appliance,
            nickname: newName,
          }
        })
      })()
    case "initialize":
      return (() => {
        const {
          payload: { appliances },
        } = action
        return appliances
      })()
    default:
      return state
  }
}
