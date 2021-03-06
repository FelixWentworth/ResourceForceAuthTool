﻿using System;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult Create([FromBody] ScenarioRequest newStory)
        {
            var scenario = newStory.ToScenarioModel();
            // Assign new serial number to indicate the scenario has changed to the player
            scenario.SerialNumber = _scenarioCoreController.GetNewSerialNumber();
            if (scenario.Comment == null)
            {
                scenario.Comment = "";
            }
            _scenarioCoreController.Create(scenario, true);
            var scenarioContract = scenario.ToScenarioContract();
            return new ObjectResult(scenarioContract);
        }

        #endregion

        #region Read

        [HttpGet]
        public IActionResult Get()
        {
            var scenarios = _scenarioCoreController.Get();
            if (scenarios == null)
            {
                return new ObjectResult(null);
            }
            var metadata = scenarios.ToMetadataList();
            return new ObjectResult(metadata);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] string id)
        {
            var scenario = _scenarioCoreController.Get(id);
            if (scenario == null)
            {
                return new ObjectResult(null);
            }
            var scenarioContract = scenario.ToScenarioContract();
            return new ObjectResult(scenarioContract);
        }

        /// <summary>
        /// Get a list of scenarios that a player with a given Id has created
        /// </summary>
        /// <param name="id">Creator Id</param>
        /// <returns></returns>
        [HttpGet("createdby/{id}")]
        public IActionResult Get([FromRoute] int id)
        {
            var scenario = _scenarioCoreController.GetByCreator(id);
            if (scenario == null)
            {
                return new ObjectResult(null);
            }
            var metadata = scenario.ToMetadataList();
            return new ObjectResult(metadata);
        }

        /// <summary>
        /// Get a list of scenarios that a user with a given Id must validate
        /// </summary>
        /// <param name="id">User Id</param>
        /// <returns></returns>
        [HttpGet("toValidate/{id}")]
        public IActionResult GetForPlayerToValidate([FromRoute] int id)
        {
            var scenarios = _scenarioCoreController.GetForUserValidation(id);
            if (scenarios == null)
            {
                return new ObjectResult(null);
            }
            var metadata = scenarios.ToMetadataList();
            return new ObjectResult(metadata);
        }

        /// <summary>
        /// Get a list of scenarios for a given region
        /// </summary>
        [HttpGet("validate")]
        public IActionResult GetForValidation([FromBody] ValidationRequest request )
        {
            var validationModel = request.ToValidationModel();

            var scenarios = _scenarioCoreController.GetForValidation(validationModel);
            if (scenarios == null)
            {
                return new ObjectResult(null);
            }
            var metadata = scenarios.ToMetadataList();
            return new ObjectResult(metadata);
        }

        /// <summary>
        /// Get a list of all scenarios newer than the serial number provided
        /// </summary>
        /// <param name="id">serial number</param>
        /// <returns></returns>
        [HttpGet("new/{id}")]
        public IActionResult GetBySerialNumber([FromRoute]long id)
        {
            var scenarios = _scenarioCoreController.Get(id);
            if (scenarios == null)
            {
                return new ObjectResult(null);
            }
            var contentContract = new List<ContentResponse>();
            foreach (var s in scenarios)
            {
                contentContract.Add(s.ToContentContract());
            }
            return new ObjectResult(contentContract);
        }

        /// <summary>
        /// Get a list of all scenarios that have been approved for a region and language
        /// </summary>
        /// <param name="language"></param>
        /// <param name="region"></param>
        /// <returns></returns>
        [HttpGet("approved/{language}/{region}")]
        public IActionResult GetApprovedByFilter([FromRoute]string language, [FromRoute]string region)
        {
            var scenarios = _scenarioCoreController.GetApproved(language, region);
            if (scenarios == null)
            {
                return new ObjectResult(null);
            }
            var metadata = scenarios.ToMetadataList();
            return new ObjectResult(metadata);
        }

        #endregion

        #region UpdateAndSubmitExisting

        [HttpPut]
        public IActionResult Update([FromBody] ScenarioRequest scenario)
        {
            var scenarioModel = scenario.ToScenarioModel();
            // Assign new serial number to indicate the scenario has changed to the player
            scenarioModel.SerialNumber = _scenarioCoreController.GetNewSerialNumber();
            scenarioModel = _scenarioCoreController.Update(scenarioModel, true);
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

            scenario = _scenarioCoreController.Update(scenario, false);

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
