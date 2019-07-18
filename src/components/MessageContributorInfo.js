import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { numberWithDelimiter } from '../utils';
import { ContDistribution, ChoroplethMap } from './'
import worldData from '../constants/world_data.json';


class MessageContributorInfo extends Component {
  getTopThreeCountries(countryCounts){
    // countryCounts
    let sortedCounts = _.sortBy(countryCounts, cc => { return cc.count }).reverse();
    let splicedCounts = _.filter(sortedCounts, sc => { return sc.count > 0; }).splice(0, 5);

    _.each(splicedCounts, (sp, i) => {
      splicedCounts[i].nameKo = _.find(worldData, wd => { return wd.id === sp.world_id; }).name_ko;
      splicedCounts[i].nameEn = _.find(worldData, wd => { return wd.id === sp.world_id; }).name_en;
    })
    return splicedCounts;

  }
  render() {


    let { currentFeature } = this.props;
    let countryCounts = currentFeature.osm_user.country_counts;
    let topThreeCountries = this.getTopThreeCountries(countryCounts);

    return (
      <div className="msg-contributor-info">
        <div className="name-rank-area">
          <div className="lv">
            <div className="label">
              지도 기여자
            </div>
            <div className="value">
              { currentFeature.osm_user.osm_user }
            </div>
          </div>
          <div className="lv">
            <div className="label">
              순위
            </div>
            <div className="value">
              { currentFeature.osm_user.rank } of 889
            </div>
          </div>
        </div>

        <div className="name-rank-area">
          <div className="lv">
            <ContDistribution width={250} height={200} allCount={currentFeature.osm_user.all_count} />
          </div>
          <div className="lv">
            <div className="label">
              오픈스트리트맵 총 기여셋 횟수*
            </div>
            <div className="value">
              { numberWithDelimiter(currentFeature.osm_user.total_contribution_count) }
            </div>
            <div className="l-apple-box">
            </div>
            <div className="label">
              북한 지도 기여 횟수
            </div>
            <div className="value">
              { numberWithDelimiter(currentFeature.osm_user.all_count) }
            </div>
            <div className="disclaimer">
              * 오픈스트리트맵은 여러 개의 지물을 고쳐 하나의 체인지세트(changeset) 단위로 업로드하는데, 총 기여세트 횟수는 이 체인지세트의 개수를 나타냅니다. 실제로 북한 지도에 기여된 지물의 개수보다 적게 나오기도 하는 이유가 됩니다. 
            </div>

          </div>
        </div>

        <div className="changeset-area">
          <div className="title-area">
            <div className="label">
              지도 기여자의 과거 기여셋 이력 비교
            </div>
            <div className="value">
              {
                _.map(topThreeCountries, (c, i) => { 
                  return( 
                    <span key={i}>
                      { `${c.nameKo}${i === topThreeCountries.length - 1 ? "" : ", "}` } 
                    </span>
                  );
                })
              }
            </div>

          </div>

          <div className="choromap-container">
            <ChoroplethMap />
          </div>

        </div>

      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentFeature: state.currentFeature
  }
}



export default connect(mapStateToProps)(MessageContributorInfo);
