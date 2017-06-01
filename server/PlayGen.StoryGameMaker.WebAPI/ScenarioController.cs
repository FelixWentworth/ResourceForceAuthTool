using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlayGen.ResourceForceAuthoringTool.Contracts;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    [Route("api/[controller]")]
    public class ScenarioController
    {
        private readonly Core.ScenarioController _scenarioCoreController;

        public ScenarioController(Core.ScenarioController storyCoreController)
        {
            _scenarioCoreController = storyCoreController;
        }

        #region Create

        [HttpPost]
        public IActionResult Create([FromBody]ScenarioRequest newStory)
        {
            var scenario = newStory.ToScenarioModel();
            _scenarioCoreController.Create(scenario);
            var scenarioContract = scenario.ToScenarioContract();
            return new ObjectResult(scenarioContract);
        }

        #endregion

        #region Read

        [HttpGet]
        public IActionResult Get()
        {
            var scenarios = _scenarioCoreController.Get();
            var metadata = scenarios.ToMetadataList();
            return new ObjectResult(metadata);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute]string id)
        {
            var scenario = _scenarioCoreController.Get(id);
            var scenarioContract = scenario.ToScenarioContract();
            return new ObjectResult(scenarioContract);
        }

        [HttpGet("serialNumber/{id}")]
        public IActionResult GetBySerialNumber([FromRoute]long id)
        {
            var scenario = _scenarioCoreController.Get(id);
            var scenarioContract = scenario.ToScenarioContract();
            return new ObjectResult(scenarioContract);
        }

        #endregion

        #region Update

        [HttpPut]
        public IActionResult Update([FromBody] ScenarioRequest scenario)
        {
            var scenarioModel = scenario.ToScenarioModel();
            scenarioModel = _scenarioCoreController.Update(scenarioModel);
            var scenarioContract = scenarioModel.ToScenarioContract();
            return new ObjectResult(scenarioContract);
        }

        #endregion

        #region Delete
        /// <summary>
        /// Delete a scenario by Id
        /// </summary>
        /// <param name="id">Id of the scenario</param>
        [HttpDelete]
        public void Delete([FromBody]string id)
        {
            _scenarioCoreController.Delete(id);

        }

        #endregion

    }
}
