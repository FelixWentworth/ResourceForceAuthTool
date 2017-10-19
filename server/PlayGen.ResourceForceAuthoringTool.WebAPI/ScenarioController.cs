﻿using Microsoft.AspNetCore.Mvc;
using PlayGen.ResourceForceAuthoringTool.Contracts;
using System.Collections.Generic;

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
            // Assign new serial number to indicate the scenario has changed to the player
            scenario.SerialNumber = _scenarioCoreController.GetNewSerialNumber();
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

        /// <summary>
        /// Get a list of scenarios that a player with a given Id has created
        /// </summary>
        /// <param name="id">Creator Id</param>
        /// <returns></returns>
        [HttpGet("createdby/{id}")]
        public IActionResult Get(int id)
        {
            var scenario = _scenarioCoreController.GetByCreator(id);
            var metadata = scenario.ToMetadataList();
            return new ObjectResult(metadata);
        }

        /// <summary>
        /// Get a list of scenarios for a given location
        /// </summary>
        [HttpGet("validate")]
        public IActionResult GetForValidation([FromBody] ValidationRequest request )
        {
            var validationModel = request.ToValidationModel();

            var scenarios = _scenarioCoreController.GetForValidation(validationModel);
            var metadata = scenarios.ToMetadataList();
            return new ObjectResult(metadata);
        }

        [HttpGet("new/{id}")]
        public IActionResult GetBySerialNumber([FromRoute]long id)
        {
            var scenarios = _scenarioCoreController.Get(id);
            var contentContract = new List<ContentResponse>();
            foreach (var s in scenarios)
            {
                contentContract.Add(s.ToContentContract());
            }
            return new ObjectResult(contentContract);
        }

        #endregion

        #region Update

        [HttpPut]
        public IActionResult Update([FromBody] ScenarioRequest scenario)
        {
            var scenarioModel = scenario.ToScenarioModel();
            // Assign new serial number to indicate the scenario has changed to the player
            scenarioModel.SerialNumber = _scenarioCoreController.GetNewSerialNumber();
            scenarioModel = _scenarioCoreController.Update(scenarioModel);
            var scenarioContract = scenarioModel.ToScenarioContract();
            return new ObjectResult(scenarioContract);
        }

        [HttpPut("metadata")]
        public IActionResult UpdateMetadata([FromBody] ScenarioRequest metadata)
        {
            var metadataModel = metadata.ToScenarioMetadata();
            
            // Assign new serial number to indicate the scenario has changed to the player
            metadataModel.SerialNumber = _scenarioCoreController.GetNewSerialNumber();

            var scenario = _scenarioCoreController.Get(metadataModel.Id);
            scenario.UpdateMetadata(metadataModel);

            scenario = _scenarioCoreController.Update(scenario);

            var scenarioContract = scenario.ToScenarioContract();
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