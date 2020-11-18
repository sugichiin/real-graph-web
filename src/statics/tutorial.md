# RealGraph<sup>Web</sup>
RealGraph<sup>Web</sup> is a web-based graph analysis service using [RealGraph](http://realgraph.hanyang.ac.kr:20080/)
The tutorial guide above would be useful to get the overall concept of RealGraph<sup>Web</sup>

RealGraph<sup>Web</sup> is a web-based platform that provides an interactive web-based interface, allowing users to access various graph analysis services by performing graph algorithms easily and conveniently anywhere on the web.
Graph analysis services using RealGraph<sup>Web</sup> are performed in three steps: graph upload, algorithm execution, and result visualization & download steps (Fig. 1). In this section, we present how a user could analyze a graph on RealGraph<sup>Web</sup> by these three steps.

![Architecture](http://realgraph.hanyang.ac.kr:20080/assets/RealGraphArchitecture.png =500x)
![Performance](http://realgraph.hanyang.ac.kr:20080/assets/RealGraphPerformance.png =500x)

# Overview of RealGraph
Conference name: The World Wide Web Conference 2019

Paper title: RealGraph: A Graph Engine Leveraging the Power-Law Distribution of Real-World Graphs

Abstract: As the size of real-world graphs has drastically increased in recent years, a wide variety of graph engines have been developed to deal with such big graphs efficiently. However, the majority of graph engines have been designed without considering the power-law degree distribution of real-world graphs seriously. Two problems have been observed when existing graph engines process real-world graphs: inefficient scanning of the sparse indicator and the delay in iteration progress due to uneven workload distribution. In this paper, we propose RealGraph, a single-machine based graph engine equipped with the hierarchical indicator and the block-based workload allocation. Experimental results on real-world datasets show that RealGraph significantly outperforms existing graph engines in terms of both speed and scalability.

# 1. Graph upload
A user uploads her target graph to RealGraph<sup>Web</sup> in a server via a network in a graph upload step. RealGraph<sup>Web</sup> provides the user with the format and a sample of an input graph data. This allows the user to upload her graph to be analyzed to the server in the correct format. Then, it converts the received graph to its own structure and stores it in the storage.

# 2. Algorithm execution
Fig. 1-(a)$\sim$(d) show the substeps of an algorithm execution step. The server provides a list of graphs already stored in RealGraph<sup>Web</sup>, among which a user selects her target for analysis (Fig. 1-(a)). The user sees the characteristics of the graph, such as numbers of nodes and edges, density, file size, etc. The server provides various graph algorithms commonly implemented in many graph engines, such as Outdegree/Indegree distribution, breadth first search (BFS), PageRank, and weakly connected component (WCC).
It also provides various additional graph algorithms, such as betweenness centrality (BC), hypertext induced topic selection (HITS), single source shortest path (SSSP), and random walk with restart (RWR).
and community detection (CD), among which a user selects one for her analysis (Fig. 1-(b)). Each algorithm has its own parameters: for instance, BFS requires the starting node while PageRank does the number of iterations. A user sets parameters as the values she wants (Fig. 1-(c)). Then, she requests the execution of the algorithm on the graph (Fig. 1-(d)).
She can recognize the effect of the techniques uniquely employed in RealGraph by selecting the options of whether it runs with or without each technique.
The server stores the result and the elapsed time of algorithm execution in a binary file after the execution is completed.

# 3. Result visualization & download
The server provides visualization and download functions in a result visualization & download step. It visualizes the execution result in a binary file in terms of a table, a chart, or a graph by using the libraries such as Matplotlib, Echarts, and Shingle.js. The server allows a user to download the image of a visualized result, and also allows a user to download the whole binary file that contains the execution result.
It provides an option to transform a binary file to a CSV file or an ARFF file for compatibility because some tools such as Matlab, R, and Weka require those formats.


Fig. 2 shows some examples of visualizing the results of different graph algorithms.
For example, in the case of Degree distribution, the frequencies of nodes having different degrees are presented in a chart (Fig. 2-(a)).
In the case of PageRank, it visualizes the graph in such a way that the size of a node is proportional to the PageRank score of the node and the nodes with top-N PageRank scores are highlighted with different colors (Fig. 2-(b)); in the case of HITS, where there exist two kinds of scores (e.g., hub score and authority score), graph visualization is similar to the previous PageRank case, but having the two kinds of result graphs for the two scores (Fig. 2-(c)); in the case of CD, it visualizes the graph in such a way that the nodes belonging to the same community have the same color and the nodes belonging to different communities have different colors (Fig. 2-(d)).


# Requirements
 - Boost 1.61+
 - G++ 5.0+
 - Ubuntu 16.04.2+

# Directories
 - algs : RealGraph algorithm codes
 - core : RealGraph engine core components
 - data : RealGraph input & output data directory (configurable)

# Installation guide (Not supported yet)
(1) Install Boost library with basic path

(2) Unzip RealGraph-CPU.zip into the preferred directory

(3) Enter 'make all' or 'make "alg"' to compile algorithm codes (replace "alg" with like bfs, pg, wcc)

 - several define options in makefile, most of them are related input data format
 - bin: binary, weighted: edge with value, adjlist: adjacency list, addweight: insert edge value for no weighted input data

(4) Run the compiled executable with key-value parameters

% engine parameters
 - datapath: path to input file
 - data : raw input file name
 - file : preprocessed input file name
 - memoryuse_mb : maximum available size of main memory in megabytes
 - threads : maximum number of threads
 - iters : maximum number of iterations
 - preprocess : boolean whether input file needs to be preprocessed
 - enginerun : boolean whether graph algorithm needs to be performed

% algorithm parameters
 - root : starting node ID

% example
 - ~# ./bfs datapath ./data/ file Twitter data twitter_rv.net memoryuse_mb 4096 threads 8 root 12 enginerun 1 preprocess 1

