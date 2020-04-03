import React from 'react';
import { map, filter, findIndex } from 'lodash';

import CheckListComponent from './CheckListComponent';
import CampaignGuideContext, { CampaignGuideContextType } from '../CampaignGuideContext';
import ScenarioStepContext, { ScenarioStepContextType } from '../ScenarioStepContext';
import { InvestigatorDeck } from 'data/scenario';
import Card from 'data/Card';
import { FACTION_LIGHT_GRADIENTS } from 'constants';

interface Props {
  id: string;
  checkText: string;
  defaultState?: boolean;
  min: number;
  max: number;
  allowNewDecks?: boolean;
  investigators?: string[];
  filter?: (investigator: Card) => boolean;
}

export default class InvestigatorCheckListComponent extends React.Component<Props> {
  _filterInvestigator = (investigator: Card): boolean => {
    const { investigators, filter } = this.props;
    if (investigators) {
      return findIndex(
        investigators,
        code => code === investigator.code
      ) !== -1;
    }
    if (filter) {
      return filter(investigator);
    }
    return true;
  };

  renderContent(allInvestigators: Card[]) {
    const {
      id,
      checkText,
      min,
      max,
      allowNewDecks,
      defaultState,
    } = this.props;
    const investigators = filter(allInvestigators, this._filterInvestigator);
    return (
      <CheckListComponent
        id={id}
        checkText={checkText}
        defaultState={defaultState}
        items={map(
          investigators,
          investigator => {
            return {
              code: investigator.code,
              name: investigator.name,
              tintColor: FACTION_LIGHT_GRADIENTS[investigator.factionCode()][0],
            };
          })
        }
        fixedMin={allowNewDecks}
        min={min}
        max={max}
      />
    );
  }

  render() {
    const { allowNewDecks } = this.props;
    return (
      <CampaignGuideContext.Consumer>
        { ({ campaignInvestigators }: CampaignGuideContextType) => {
          return (
            <ScenarioStepContext.Consumer>
              { ({ scenarioInvestigators }: ScenarioStepContextType) => {
                return this.renderContent(allowNewDecks ? campaignInvestigators: scenarioInvestigators);
              } }
            </ScenarioStepContext.Consumer>
          );
        } }
      </CampaignGuideContext.Consumer>
    );
  }
}
