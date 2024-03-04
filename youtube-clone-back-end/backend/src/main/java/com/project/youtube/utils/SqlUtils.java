package com.project.youtube.utils;

public class SqlUtils {
    /**
     * transform camel case to snake
     * @param camelCase the camel case string
     * @return the snake word
     */
    public static String camelToSnake(String camelCase) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < camelCase.length(); i++) {
            char currentChar = camelCase.charAt(i);
            // If the current character is uppercase, and it's not the first character
            if (Character.isUpperCase(currentChar) && i > 0) {
                // Append an underscore before adding the lowercase version of the character
                result.append('_').append(Character.toLowerCase(currentChar));
            } else {
                // Otherwise, just append the character as it is
                result.append(currentChar);
            }
        }
        return result.toString();
    }

}
