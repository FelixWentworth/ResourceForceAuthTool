using Microsoft.AspNetCore.Mvc;

namespace PlayGen.ResourceForceAuthoringTool.WebAPI
{
    [Route("api/[controller]")]
    public class VersionController
    {
        [HttpGet]
        public IActionResult GetVersion() => new ObjectResult(Core.Version.Full);
    }
}
