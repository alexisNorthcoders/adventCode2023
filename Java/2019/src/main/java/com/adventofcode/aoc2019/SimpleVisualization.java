package com.adventofcode.aoc2019;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

/**
 * Simple AWT-based visualization for linear relationship analysis.
 * Creates a basic graphics window showing data points and trend line.
 */
public class SimpleVisualization extends JFrame {
    
    private int[][] testPoints;
    private int[] results;
    private int base;
    private int nounCoeff;
    private int verbCoeff;
    
    public SimpleVisualization(int[][] testPoints, int[] results, int base, int nounCoeff, int verbCoeff) {
        this.testPoints = testPoints;
        this.results = results;
        this.base = base;
        this.nounCoeff = nounCoeff;
        this.verbCoeff = verbCoeff;
        
        setTitle("Linear Relationship Visualization - Advent of Code 2019 Day 2");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
        setLocationRelativeTo(null);
        
        add(new VisualizationPanel());
        
        // Add window listener to print when closed
        addWindowListener(new WindowAdapter() {
            @Override
            public void windowClosed(WindowEvent e) {
                System.out.println("✅ Visualization window closed. Continuing...");
            }
        });
    }
    
    private class VisualizationPanel extends JPanel {
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            Graphics2D g2d = (Graphics2D) g;
            g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            
            // Set background
            g2d.setColor(Color.WHITE);
            g2d.fillRect(0, 0, getWidth(), getHeight());
            
            // Set up drawing parameters
            int margin = 80;
            int plotWidth = getWidth() - 2 * margin;
            int plotHeight = getHeight() - 2 * margin;
            
            // Find min and max values for scaling
            int minResult = Integer.MAX_VALUE;
            int maxResult = Integer.MIN_VALUE;
            for (int result : results) {
                minResult = Math.min(minResult, result);
                maxResult = Math.max(maxResult, result);
            }
            
            // Draw axes
            g2d.setColor(Color.BLACK);
            g2d.setStroke(new BasicStroke(2));
            g2d.drawLine(margin, getHeight() - margin, getWidth() - margin, getHeight() - margin); // X-axis
            g2d.drawLine(margin, margin, margin, getHeight() - margin); // Y-axis
            
            // Draw axis labels
            g2d.setColor(Color.BLACK);
            g2d.setFont(new Font("Arial", Font.BOLD, 14));
            FontMetrics fm = g2d.getFontMetrics();
            String xLabel = "Noun Value";
            g2d.drawString(xLabel, (getWidth() - fm.stringWidth(xLabel)) / 2, getHeight() - 20);
            
            // Y-axis label (rotated)
            String yLabel = "Output Value";
            g2d.rotate(-Math.PI / 2, 20, getHeight() / 2);
            g2d.drawString(yLabel, 0, 0);
            g2d.rotate(Math.PI / 2, 20, getHeight() / 2);
            
            // Draw data points
            g2d.setColor(Color.RED);
            for (int i = 0; i < testPoints.length; i++) {
                int noun = testPoints[i][0];
                int verb = testPoints[i][1];
                int result = results[i];
                
                // Scale coordinates
                int x = margin + (int) (noun * plotWidth / 2.0); // Scale noun to fit
                int y = getHeight() - margin - (int) ((result - minResult) * plotHeight / (double) (maxResult - minResult));
                
                // Draw point
                g2d.fillOval(x - 4, y - 4, 8, 8);
                
                // Draw label
                g2d.setColor(Color.BLUE);
                g2d.setFont(new Font("Arial", Font.PLAIN, 10));
                g2d.drawString(String.format("(%d,%d)", noun, verb), x + 10, y - 10);
                g2d.drawString(String.format("%d", result), x + 10, y + 5);
            }
            
            // Draw linear trend line
            g2d.setColor(Color.GREEN);
            g2d.setStroke(new BasicStroke(3));
            
            // Calculate line endpoints
            int x1 = margin;
            int y1 = getHeight() - margin - (int) ((base - minResult) * plotHeight / (double) (maxResult - minResult));
            int x2 = getWidth() - margin;
            int y2 = getHeight() - margin - (int) ((base + nounCoeff * 2 - minResult) * plotHeight / (double) (maxResult - minResult));
            
            g2d.drawLine(x1, y1, x2, y2);
            
            // Draw formula
            g2d.setColor(new Color(0, 100, 0)); // Dark green
            g2d.setFont(new Font("Arial", Font.BOLD, 16));
            String formula = String.format("Formula: output = %,d + %,d×noun + %d×verb", base, nounCoeff, verbCoeff);
            g2d.drawString(formula, margin, 30);
            
            // Draw legend
            g2d.setFont(new Font("Arial", Font.PLAIN, 12));
            g2d.setColor(Color.RED);
            g2d.fillOval(margin, getHeight() - 100, 10, 10);
            g2d.drawString("Data Points", margin + 20, getHeight() - 92);
            
            g2d.setColor(Color.GREEN);
            g2d.setStroke(new BasicStroke(3));
            g2d.drawLine(margin, getHeight() - 80, margin + 20, getHeight() - 80);
            g2d.drawString("Linear Trend", margin + 25, getHeight() - 75);
        }
    }
    
    /**
     * Static method to create and show the visualization
     */
    public static void showVisualization(int[][] testPoints, int[] results, int base, int nounCoeff, int verbCoeff) {
        SwingUtilities.invokeLater(() -> {
            SimpleVisualization viz = new SimpleVisualization(testPoints, results, base, nounCoeff, verbCoeff);
            viz.setVisible(true);
        });
    }
}
