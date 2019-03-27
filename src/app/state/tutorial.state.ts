// Section 1
import { State, Action, StateContext, Selector } from "@ngxs/store";

import { Tutorial } from "./../models/tutorial.model";
import { AddTutorial, RemoveTutorial } from "./../actions/tutorial.actions";

// Section 2
export class TutorialStateModel {
  tutorials: Tutorial[];
  test: any[];
}

// Section 3
@State<TutorialStateModel>({
  name: "tutorials",
  defaults: {
    tutorials: [],
    test: []
  }
})
export class TutorialState {
  // Section 4
  @Selector()
  static getTutorials(state: TutorialStateModel) {
    return state.tutorials;
  }

  // Section 5
  @Action(AddTutorial)
  add(
    {
      dispatch,
      getState,
      patchState,
      setState
    }: StateContext<TutorialStateModel>,
    { payload }: AddTutorial
  ) {
    const state = getState();
    patchState({
      tutorials: [...state.tutorials, payload]
    });
    //dispatch(new RemoveTutorial('pok'));
  }

  @Action(RemoveTutorial)
  remove(
    { getState, patchState }: StateContext<TutorialStateModel>,
    { payload }: RemoveTutorial
  ) {
    patchState({
      tutorials: getState().tutorials.filter(a => a.name != payload)
    });
  }
}
