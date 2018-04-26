using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PlayGen.ResourceForceAuthoringTool.Core
{
    public static class Version
    {
        public const int Major = 0;

        public const int Minor = 0;

        public const int Build = 0;
        
        public static string Full => $"{Major}.{Minor}.{Build}";

        public static bool IsMajorVersionMatch(string checkVersion) => int.Parse(checkVersion.Split('.')[0]) == Major;
    }
}
